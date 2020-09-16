const { Model } = require("objection");

class Offender extends Model {
  static get tableName() {
    return "OFFENDER";
  }

  static get idColumn() {
    return "OFFENDER_ID";
  }
  static get columnNameMappers() {
    return {
      parse(obj) {
        return {
          prisonNumber: obj.PRISON_NUMBER,
          croNumber: obj.CRO_PNC,
        };
      },

      format() {
        throw "Not implemented";
      },
    };
  }
}

module.exports = Offender;
