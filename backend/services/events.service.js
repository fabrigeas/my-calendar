"use strict";

const name = "events";

const schemaDefinition = {
  title: { type: String, required: true },
  note: { type: String },

  startDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endDate: { type: String, required: true },
  endTime: { type: String, required: true },

  organizer: {
    email: { type: String, default: "" },
  },

  location: { type: String },
  concerned: { type: String, required: true },
  links: { type: Array },
  downloadCSV: { type: Boolean },
  days: { type: Number },
  duration: { type: Number },
};

const DbMixin = require("../mixins/mongoose.mixin")(name, schemaDefinition);

/** @typedef {import('moleculer').Context} Context Moleculer's Context */
module.exports = {
  mixins: [DbMixin],

  actions: {
    upload: {
      /** Upload a user's file
       *
       * @param {Context} ctx
       * @return {Promise}
       */
      handler(ctx) {
        return ctx.call("files.saveBlob", ctx.params);
      },
    },
  },

  hooks: {
    before: {},
  },
};
