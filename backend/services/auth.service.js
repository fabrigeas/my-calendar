"use strict";

const moment = require("moment");
const jwt = require("jsonwebtoken");
const passwordHash = require("password-hash");
const duration = 5;// in minutes
const salt = "5e8dfc70bf3aff05cc1894b2";

module.exports = {

	name: "auth",

	actions: {

		/** Generates a token object
     * 
     * @param {Object} data - the data to be tokenized
     * 
     * @returns {Object} - {accessToken, expirationDate}
     * 
     */
		generateToken: {

			rest: "POST|PUT /",

			params: {
				data: "object"
			},

			handler(ctx) {
				const {data} = ctx.params;
				
				return {
					accessToken: jwt.sign( data, salt, {expiresIn: `${duration}m`}),
					expirationDate: this.calculateExpirationDateInMinutes(duration),
					data,
				};
			}

		},

		/** Verifies an access token 
     * 
     * @param {String} token - the token to be verified (accessToken).
     * 
     * @returns {Object}
    */
		verifyToken: {
      
			rest: "* /",
      
			params: {
				token: "string"
			},

			handler(ctx) {
				return new Promise( (resolve, reject) => {
					jwt.verify(ctx.params.token, salt, function(error, decoded) {
						if (error) return reject(error);
						return resolve(decoded);
					});
				});
			}

		},

		/** Verifies and renews an accessToken
     * 
     * @param {String} token - the token to be renewd
     * 
     * @returns {Object} {accessToken, expirationDate}
     *  
     */
		verifyAndRenewToken: {

			rest: "POST|PUT /",

			params: {
				token: "string"
			},

			handler(ctx) {
        
				return jwt.verify( ctx.params.token, salt,
					async function(error, data) {
						if (error) {
							return Promise.resolve({error});
						}

						delete data.exp;
						delete data.iat;
              
						return ctx.call("auth.generateToken", {data});
					},
				);
			}
		},

		/** hashes a password
     * 
     * @params {String} password - the password to be encoded
     * 
     * @returns {String}
     */
		encodePassword: {

			rest:  "* /",

			params: {
				password: "string", // The password to be encoded
			},

			handler(ctx) {
				return passwordHash.generate(ctx.params.password);
			}

		},

		/** Checks that one password is the encoded varsion of the other
     * 
     * @param {Object} params
     * @param {String} params.password 
     * @param {String} params.hashedPassword
     * 
     * @returns {Boolean} 
     */
		veriyfyPasswords: {

			rest:  "* /",
      
			params: {
				password: "string",
				hashedPassword: "string",
			},

			handler({params: {password, hashedPassword}}) {
				return passwordHash.verify(password, hashedPassword);
			}

		},

		/** destroys a token by setting the expiration date to -1
     * 
     */
		destroyToken: {
			params: {
				token: "string",
			},

			handler(ctx) {
        
				return jwt.verify( ctx.params.token, salt,
					async function(error, data) {
						if (error) {
							return Promise.resolve({error});
						}

            
						delete data.exp;
						delete data.iat;

						console.log(data);

						return Promise.resolve({
							accessToken: jwt.sign( data, salt, {expiresIn: 0}),
							success: true,
						});

					},
				);
			}
		},

	},

	methods: {

		/** Converts the number of minutes into miliseconds
    * Use this function to set duration in miliseconds
    *
    * @param {Number} minutes
    * @return {String}
    */
		calculateExpirationDateInMinutes(minutes = 1) {
			const date = moment().add(minutes, "minutes");
			return moment(date.format()).add(2, "hours").toDate();
		},


	},

};
