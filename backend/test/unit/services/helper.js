var request = require('request-promise');


/** Make a http request request
* 
* @param {Object} user 
* @param {Object} options 
* @param {String} options.url 
* @param {String} [options.method="POST"]
* @param {String} [options.uri] - The complete url for the request
* @param {Object} [options.body]
*/

/** Make a http request
 * 
 * @param {Object} user 
 * @param {String} url 
 * @param {Object} properties 
 * @param {String} [properties.method="GET"] 
 * @param {String} [properties.uri] - Full http address 
 * @param {Object} properties.body 
 */
const fetch = async (user, url, {method = "GET", body, uri} = {} ) => {

  const options = {
    // uri: uri || `http://localhost:3002/api/${url}`,
    uri: uri || `http://localhost:3002/api/${url}`,
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
    json: true
  };

  if( user ) {
    options.headers["access-token"] = user.accessToken;
  }

  return await request(options);

};

module.exports = {

  fetch,

  /** Delete a single Object by id
   * @param {Object} user
   * @param {String} url
   */
  remove: async (user, url) => await fetch(user, `${url}`, {method: "DELETE"}),

  /** Get a user by ID
   * 
   * @param {Object} user
   * @param {String} endpoint
   * @param {String} id
   *  @returns {Promise}
   * 
   */
  get: async (user, endpoint, id) => fetch( user, `${endpoint}/${id}`),

  /** Make a POST request
   * @param {User}, [user]
   * @param {String}, endpoint - The queryString without base url because testing usese the /debug route
   * @param {Object} payload
   * @param {String} payload.method
   * @param {Object} payload.body
   * @param {String} [payload.uri] - The full url. starting with http...
   * @returns {Promise}
   */
  post: async(user, endpoint, body) => fetch(user, endpoint, {method: "POST", body}),

  /** Make an A PUT request
   * @param {Object} user
   * @param {String} url
   * @param {Object} body
   * @returns {Promise}
   */
  put: async (user, url, body) => await fetch(user, `${url}`, {
		method: "PUT",
		body: {
      ...body,
		}
  }),

  /** List/Find entities based on the queryString
   * 
   * @param {Object} user
   * @param {String} queryString
   * 
   */
  list: async (user, queryString) => fetch( user, `${queryString}`),

  reset: async (user, endpoint) => fetch( user, `${endpoint}.reset`),

}