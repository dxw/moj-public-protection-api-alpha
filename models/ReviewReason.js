const { Model } = require("objection");

class ReviewReason extends Model {
  static get tableName() {
    return "REVIEW_REASON";
  }
  static get columnNameMappers() {
    return {
      parse(obj) {
        return {
          description: obj.DESCRIPTION,
        };
      },

      format() {
        throw "Not implemented";
      },
    };
  }
}

module.exports = ReviewReason;
