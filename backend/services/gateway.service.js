"use strict";

const ApiGateway = require("moleculer-web");
const {
	server: { port },
} = require("../config");
const MoleculerWebError = require("moleculer-web").Errors;
const { MoleculerError } = require("moleculer").Errors;
const cookieParser = require("cookie-parser");
const compression = require("compression");

const fs = require("fs");
const path = require("path");
const multiparty = require("multiparty");

const bodyParsers = {
	json: {
		strict: false,
	},
	urlencoded: {
		extended: true,
	},
};

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 * @typedef {import('http').IncomingMessage} IncomingRequest Incoming HTTP Request
 * @typedef {import('http').ServerResponse} ServerResponse HTTP Server Response
 */

module.exports = {
	name: "gateway",

	// version: 2,

	mixins: [ApiGateway],

	settings: {
		port,
		// Exposed IP
		// ip: "0.0.0.0",

		cors: {
			origin: "*",
			methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
			allowedHeaders: [
				"Content-type",
				"access-token",
				"expirationDate",
				"user",
				"props",
			],
			exposedHeaders: [
				"access-token", 
				"expirationDate",
				"props",
			],
			credentials: false,
			maxAge: 3600,
		},

		// Global Express middlewares. More info: https://moleculer.services/docs/0.14/moleculer-web.html#Middlewares
		use: [cookieParser(), compression()],

		routes: [
			{
				path: "/api/secure",
				autoAliases: true,
				authentication: true,
				mappingPolicy: "all",
				bodyParsers,
				whitelist: ["**"],
				aliases: {},
			},

			{
				path: "/api",
				autoAliases: true,
				authentication: false,
				mappingPolicy: "all",
				bodyParsers,
				whitelist: [
				  '**',
				],
			},

			// /files/upload
			{
				path: "/api/files",

				aliases: {
					"POST upload"(req, res) {
						new multiparty.Form().parse(req, async (_err, _fields, files) => {
							const file = files.file[0];
							const props = JSON.parse(req.headers.props);

							await this.broker
								.call("files.save", { file, props })
								.then((result) =>
									res.end(JSON.stringify({ success: true, result }))
								)
								.catch((error) =>
									res.end(JSON.stringify({ success: false, error }))
								);
						});
					},
				},
			},
		],

		/** Use global error handler to redirect all 404 to the vue app index page
		 * This is because of Vue Router
		 *
		 * @param {*} req
		 * @param {*} res
		 * @param {*} err
		 */
		// onError(req, res, err) {
		// 	this.logger.error(err, req.params);

		// 	if (err.type === "NOT_FOUND") {
		// 		const page = fs.readFileSync(
		// 			path.join(__dirname, "../public/index.html")
		// 		);
		// 		res.end(page);
		// 	} else {
		// 		res.setHeader("Content-Type", "application/json");
		// 		res.end(JSON.stringify(err));
		// 	}
		// },

		assets: {
			folder: "public",
			options: {},
		},
	},

	methods: {
		async authorize(ctx, _route, req, _res) {
			const auth = req.headers["authorization"];

			if (auth && auth.startsWith("Bearer")) {
				const token = auth.slice(7);

				if (token == "123456") {
					return Promise.resolve(ctx);
				} else {
					return Promise.reject(new MoleculerWebError.UnAuthorizedError(MoleculerWebError.ERR_INVALID_TOKEN));
				}
			} else {
				return Promise.reject(new MoleculerWebError.UnAuthorizedError(MoleculerWebError.ERR_NO_TOKEN));
			}
		},

		async authenticate(ctx, _route, req, res) {
      
			const token = req.query["access-token"] || req.headers["access-token"] || req.cookies["access-token"];

			if (token) {

				const newToken = await ctx.call("auth.verifyAndRenewToken", {token});
				const {error, accessToken, expirationDate, data} = newToken;

				if (error) {
					return Promise.resolve( new InvalidAccessTokenError("Invalid access token. Your token may have expired. Please sign in again to obtain a new access-token", error));
				} else {

					res.setHeader("access-token", accessToken);
					res.setHeader("expirationDate", expirationDate);

					return Promise.resolve({accessToken, expirationDate, ...data.user}); // this will populate the ctx.meta
				}
			} else {
				return Promise.resolve( new MissingAccessTokenError("Missing 'access-token'. No 'access-token' was found in your request header."));
			}
		},
	},
};

/** Custom moleculer Error
 *
 */
class InvalidAccessTokenError extends MoleculerError {
	/**
	 *
	 * @param {String} msg
	 */
	constructor(msg) {
		super(msg);
	}
}

/** Custom moleculer Error
 *
 */
class MissingAccessTokenError extends MoleculerError {
	/**
	 *
	 * @param {String} msg
	 */
	constructor(msg) {
		super(msg);
	}
}
