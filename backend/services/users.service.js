"use strict";

const name = "users";

const { MoleculerError } = require("moleculer").Errors;
const {
	server: { url },
} = require("../config");
const schemaDefinition = {
	firstname: { type: String, required: true, },
	lastname: { type: String, required: true, },
	username: { type: String, required: true, },
	email: { type: String, required: true, unique: false,},
	phone: { type: String, },
	password: { type: String, required: true, },
	avatar: { type: Object,},
	address: { 
		street: {type: String, default: "" },
		number: {type: String, default: ""  },
		other: {type: String, default: "" },
		city: {type: String, default: "" },
		zip: {type: String, default: "" },
		country: {type: String,  default: "" },
	},
	icon: String,
	token: String,
	passwordResetToken: String,
	tokenExpirationDate: Number,
};

/** Properties that mongoose will create as virtualKeys*/
const virtualKeys = [
	{
		name: "pic",
		ref:  "avatar",
		path: "/"
	}
];

const DbMixin = require("../mixins/mongoose.mixin")(name, schemaDefinition, virtualKeys);

/** @typedef {import('moleculer').Context} Context Moleculer's Context */
module.exports = {

	mixins: [DbMixin],

	actions: {

		isAvailable: {
			cache: false,

			/** Returns true if the input username or password is not yet present in the db
       *
       * @param {Context} param0
       */
			async handler({ params: query }) {
				const users = await this.adapter.find({ query });
				return users.length < 1;
			},

		},

		checkAvailability: {

			cache: false,

			/** Returns true if the input username or password is not yet present in the db
       *
       * @param {Context} param
       */
			async handler({ params: query }) {
				const users = await this.adapter.find({ query });
				return users.length < 1;
			},

		},

		signin: { handler: (ctx) => ctx.call("users.signIn", ctx.params) },
		signup: { handler: (ctx) => ctx.call("users.signUp", ctx.params) },
		signout: { handler: (ctx) => ctx.call("users.signOut", ctx.params) },

		/** Sign in a user with the credentials
     * 
     * @param {String} pseudo
     * @param {String} password
     * 
     * @returns {Object} the signed in user, {...user, accessToken, expirationDate}
     */
		signIn: {

			rest: "POST|PUT /",

			params: {
				password: "string",
				pseudo: "string"
			},

			async handler(ctx) {

				const { params } = ctx;
				const { password, pseudo } = params;
				const query = {
					$or: [
						{ email: pseudo },
						{ phone: pseudo },
						{ username: pseudo },
					]
				};

				let user = (await this.adapter.find({ query }))[0];

				if (user) {

					const hashedPassword = user.password;

					if (await ctx.call("auth.veriyfyPasswords", { password, hashedPassword })) {
					// if (true) {
						user.token = null;
						const data = { user };

						const { accessToken, expirationDate } = await ctx.call("auth.generateToken", { data });

						// user.token = accessToken;

						await user.save();
            
						user.password = undefined;
						delete user.password;
            
						return {
							user,
							accessToken,
							expirationDate,
						};

					} else {

						return {
							success: false,
							message: "Incorrect password",
						};

					}
				} else {
					return {
						status: 404,
						success: false,
						message: "No user found with the given username/email/phone number",
					};
				}
			},

		},

		signUp: {

			async handler(ctx) {

				const { params: user } = ctx;
				const query = { email: user.email };
				const duplicate = await this.findOne(query);
				// const duplicate = await this.findOne({email: user.email});

				if (duplicate) {
					return Promise.reject(new UserAlreadyExistError("A user already exists with this E-mail address or username", duplicate));
				} else {
					return ctx.call(`${name}.create`, user);
				}
			},
		},

		/** Takes the accessToken as parameter then desptroy it
     * @param {String} accessToken
     * 
     * @returns {Object}
     */
		signOut: {

			async handler() {
				return {
					success: true,
				};
				// return ctx.call("auth.destroyToken", { token: ctx.params.accessToken });
			}
		},

		deleteAccount: {

			handler(ctx) {
				return ctx.call("users.remove", ctx.params);
			}
		},

		upload: {

			/** Upload a user's file
       *
       * @param {Context} ctx
       * @return {Promise}
       */
			handler(ctx) {
				return ctx.call("files.saveBlob", ctx.params);
			}
		},

		async deleteTestUsers(ctx) {
			return ctx.call("users.find", ctx.params)
				.then(async (user) => ctx.call("users.remove", { id: user.id }))
				.catch((error) => error);
		},

		/** Request a password request
		 * find the user by email,
		 * generate a token and save it with the user
		 * email this token to the provided email
		 * 
		 * @param {String} email
		 */
		requestPasswordReset: {
      
			async handler(ctx) {
				
				const query = ctx.params;
				const user = await this.findOne(query);

				if ( user.id ) {
					const token = await ctx.call("auth.generateToken", {data: ctx.params});

					user.passwordResetToken = token.accessToken;
					user.tokenExpirationDate = new Date(token.expirationDate).getTime();

					! user.firstname && ( user.firstname = "Fabrice");
					! user.lastname < 2 && ( user.lastname= "Feugang Kemegni");

					await user.save();

					const href = `${url}/resetPassword/${token.accessToken}`;
					const a = `<a href="${href}">${href}</a>`;
					const html = `<div>
						<h3>Reset your password</h3>
						Hello,<br>
						you have requested to recover(reset) your password.<br>
						Please click on the link below to set a new password.
						If you do not click on the link within the next 5 minutes,
						the link will expire and your password will not be changed.<br>
						<p>${a}</p>
					</div>`;

					ctx.call("notification.sendEmail", {
						to: ctx.params.email,
						subject: "[Reset your password]",
						text: "Hi Human, click on the following link to reset your password",
						html,
					});

					return href;

				}

				return "no user could be found with the information the you provided";
			}
		},

		resetPassword: {

			async handler(ctx) {

				const {email, password} = ctx.params;
				const query = {email};
				const user = ( await this.adapter.find({query}) )[0];

				if ( user ) {

					user.password = await ctx.call("auth.encodePassword", {password} );
					user.tokenExpirationDate = null;
					user.passwordResetToken = null;
					user.passwordResetToken = null;
					user.token = null;

					await user.save();

					return {
						success: true,
					}
				}

				return "no user could be found with the information the you provided";
			}
		},

		/** 
     * 
     */
		updatePassword: {
			params: {
				user: "object",
				password: "string"
			},

			handler(ctx) {
				const {user: {email}, password} = ctx.params;
				return ctx.call("users.resetPassword", {email, password})
			}
		},

		verifyPasswordResetToken: {

			async handler(ctx) {
				const user = await ctx.call(`${name}.findOne`, ctx.params);

				// if( user && user.tokenExpirationDate > new Date().getTime() ) {
					this.logger.info({user})
				if( user ) {
					return {
						success: true,
						user
					}
				}

				return {
					success: false,
				}
			}
		},

	},

	hooks: {
		before: {
			create: ["beforeCreate"],
			insert: ["beforeCreate"],
			update: ["deletePassword"],
		},
		after: {
			find:["removePasswordForAll"],
			list:["removePasswordForAll"],
			findOne:["removePassword"],
			get:["removePassword"],
			create:["removePassword"],
			update:["removePassword"],
		}
	},

	methods: {

		// reset: () => [],

		/** Encode password before inserting to database
     *
     * @param {Context} ctx
     *
     * @returns {Object} user
     */
		async beforeCreate(ctx) {
			const user = ctx.params;

			user.password = await ctx.call("auth.encodePassword", { password: user.password });

			return user;
		},

		/** Delete the password before updating.
     * Password updates is perfomrmed by calling 
     * this.adapter.update
     *
     * @param {Context} ctx
     *
     * @returns {Object} user
     */
		async deletePassword(ctx) {
			const user = ctx.params;

			delete user.password;

			return user;
		},

		/** Removes the passwords from each users in the result
     * 
     * @param {Context} ctx 
     * @param {Object} users 
     * 
     * @returns {Array}
     */
		async removePasswordForAll(_ctx, users) {
			
      for ( let user of users) {
        user.password = undefined;
      }
			return users;
		},

		/** Remove sensitive information before returning
     * 
     * @param {Context} ctx 
     * @param {Object} user 
     * 
     */
		removePassword(_ctx, user) {


			user && (user.password = undefined);
			return user;

		},
    
	},

};

/** A custom moleculer error
 *
 */
class UserAlreadyExistError extends MoleculerError {
	/**
   *
   * @param {String} msg
   */
	constructor(msg) {
		super(msg);
	}
}
