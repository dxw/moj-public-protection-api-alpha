const { Model } = require("objection");
const { createColumnMappers } = require("../utils");

class Offender extends Model {
  static get tableName() {
    return "OFFENDER";
  }

  static get idColumn() {
    return "OFFENDER_ID";
  }
  static get columnNameMappers() {
    return createColumnMappers({
      PRISON_NUMBER: "prisonNumber",
      CRO_PNC: "croNumber",
    });
  }
  static get relationMappings() {
    const Review = require("./Review");
    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "OFFENDER.OFFENDER_ID",
          to: "REVIEW.OFFENDER_ID",
        },
      },
    };
  }
}

module.exports = Offender;
