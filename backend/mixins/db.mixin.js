'use strict'

const MongooseAdapter = require('moleculer-db-adapter-mongoose')
const	{ uri, connectionOptions } = require('../secret/mongoose.config')
const { url } = require('../config').server
const mongoose 	= require('mongoose')
const { Schema } 		= mongoose
const schemaOptions = {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  versionKey: false
}

/** Error handler for actions
 * Triggered when an action fails
 * 
 * @param {Context} _ctx 
 * @param {Moleculer.Error} error
 * 
 * @returns {Promise} 
 */
function fallback( _ctx, error ) {
  return Promise.resolve(error)
}

/** @typedef {import('moleculer').Context} Context Moleculer's Context */

module.exports = function (name, schemaDefinition, fields, virtualKeys) {
  const cacheCleanEventName = `cache.clean.${name}`

  const schema = new Schema(schemaDefinition, schemaOptions)

  schema.virtual('url').get( function () { 
      return `${url}/api/${name}/${this._id}` 
  });


  /**
   *  Create virtual properies dynamically by computing them against document properties
   * forexample {name:pic, key: "avatar", path: "/"} => localhost:3000/uploads/fabrigeas.jpg
   */

  virtualKeys && virtualKeys.forEach( function (i) {
    schema.virtual(`${i.name}`).get( 
      function () { 
        return `${url}${this[i.ref]}` 
      }
    );
  });

  return {

    adapter: new MongooseAdapter(uri, connectionOptions),

    name,

    url,
    
    // version: 3, // 05.05.2020

    mixins: [require('moleculer-db')],

    model: mongoose.model(name.toUpperCase(), schema),

    settings: {

      pageSize: 10, // Number of results per page,
      maxPageSize: 20, // Total number of pages to read,
      maxLimit: 10, // Number_required_Maximum_value_of_limit_in_find_action,// Default: -1 (no limit)

      idField: name.toUpperCase(),

      fields: [
        'id',
        'user',
        'url',
        ...fields
      ]
    },

    events: {

      /** Subscribe to the cache clean event. If it's triggered
			 * clean the cache entries for this service.
			 *
			 * @param {Context} ctx
			 */
      async [cacheCleanEventName] () {
        if (this.broker.cacher) {
          await this.broker.cacher.clean(`${this.fullName}.*`)
        }
      }

    },

    actions: {

      get: {
        cache: false,
        fallback
      },

      count: {
        cache: false
      },

      list: {

        cache: false,

        handler (ctx) {
          return ctx.call(`${this.name}.find`, ctx.params)
        }, 

        fallback,

      },

      find: {

        cache: false,

        handler (ctx) {
          return this.adapter.find({ query: ctx.params })
        },

        fallback

      },

      findOne: {

        cache: false,

        async handler (ctx) {
          return this.findOne(ctx.params)
        }

      },

      ping (ctx) {
        return `Hello world from ${this.name} + ${ctx.params}`
      },

      async reset () {
        return await this.reset()
      },

      /** Deletes many entries,
			 *
			 */
      deleteWhere: {

        cache: false,

        async handler (ctx) {
          const query = ctx.params

          const itemsToBeDeleted = await ctx.call(`${this.name}.find`, query)

          for await (const i of itemsToBeDeleted) {
            // fix this bug !!!
            await ctx.call(`${i.form}s.remove`, { id: i.id })
          }

          return ctx.call(`${this.name}.find`, ctx.params)
        }

      }

    },

    hooks: {
      before: {
        find:["appendUserIdToQuery"],
      }
    },

    methods: {

      /** returns the first result from thfind query
			 *
			 * @param {*} query
			 *
			 * @returns {Object}
			 */
      findOne (query) {
        return this.adapter.findOne(query)
      },

      /** Send a cache clearing event when an entity changed.
			 *
			 * @param {String} type
			 * @param {any} json
			 * @param {Context} ctx
			 */
      async entityChanged (type, json, ctx) {
        ctx.broadcast(cacheCleanEventName)
      },

      /** Resets the database by deleteing every document
			 *
			 */
      async reset () {
        await this.adapter.clear()
        return await this.broker.call(`${this.name}.find`)
      },

      /** given a list or entries, filters and returns only
			 * entries where user === ctx.meta.user.id
			 *
			 * @param {Context} ctx
			 * @param {Array} data
			 *
			 * @returns {Array}
			 */
      filterResultByUserId (ctx, data) {
        if (ctx.meta.user) {
          const user = ctx.meta.user.id
          data = data.filter(i => String(i.user) === String(user))
        }

        return data
      },

      appendUserIdToQuery(ctx) {

        if (ctx.meta.user) {
          ctx.params.user = ctx.meta.user.id;
        }
      }

    }

  }
}
