const { Model } = require("objection");
const { createColumnMappers } = require("../utils");

class ReviewReason extends Model {
  static get tableName() {
    return "REVIEW_REASON";
  }
  static get columnNameMappers() {
    return createColumnMappers({
      DESCRIPTION: "description",
    });
  }
}

module.exports = ReviewReason;
