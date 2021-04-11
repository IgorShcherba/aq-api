"use strict";
const _ = require("lodash");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   * Promise to fetch the record
   *
   * @return {Promise}
   */
  async find(populate) {
    const results = await strapi
      .query("home-page")
      .find({ _limit: 1 }, [
        "rooms",
        "hero_image",
        "rooms.room_gallery.images",
        "feature",
        "feature.image",
      ]);
    return _.first(results) || null;
  },
};
