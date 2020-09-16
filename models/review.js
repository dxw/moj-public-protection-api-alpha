const { Model } = require("objection");
const ReviewReason = require("./ReviewReason");
const Offender = require("./Offender");

class Review extends Model {
  static get tableName() {
    return "REVIEW";
  }
  static get idColumn() {
    return "REVIEW_ID";
  }
  static get columnNameMappers() {
    return {
      parse(obj) {
        return {
          id: obj.REVIEW_ID,
          offender: obj.OFFENDER_ID,
          review_date: obj.REVIEW_DATE,
          comments: obj.REVIEW_COMMENTS,
          video_link: obj.VIDEOLINK,
          victim_details_obtained: obj.VICTIM_DETAILS_OBTAINED,
          advocate_details: obj.ADVOCATE_DETAILS,
          witness_details: obj.WITNESS_DETAILS,
          panel_details: obj.PANEL_DETAILS,
          solicitor: {
            firm: obj.SOLICITOR_FIRM,
            address: obj.SOLICITOR_ADDRESS_1,
            phone_number: obj.SOLICITOR_PHONE,
            fax_number: obj.SOLICITOR_FAX,
            email_address: obj.SOLICITOR_EMAIL,
          },
        };
      },

      format() {
        throw "Not implemented";
      },
    };
  }
  static get relationMappings() {
    return {
      reason: {
        relation: Model.HasOneRelation,
        modelClass: ReviewReason,
        join: {
          from: "REVIEW.REVIEW_REASON",
          to: "REVIEW_REASON.ID",
        },
      },
      offender: {
        relation: Model.HasOneRelation,
        modelClass: Offender,
        join: {
          from: "REVIEW.OFFENDER_ID",
          to: "OFFENDER.OFFENDER_ID",
        },
      },
    };
  }
}

module.exports = Review;
