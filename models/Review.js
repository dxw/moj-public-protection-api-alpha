const { Model } = require("objection");
const ReviewReason = require("./ReviewReason");
const Offender = require("./Offender");
const Document = require("./Document");

/**
 * @swagger
 *
 * definitions:
 *   Review:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       review_date:
 *         type: string
 *         format: date-time
 *       offender:
 *         type: object
 *         properties:
 *           prisonNumber:
 *             type: string
 *           croNumber:
 *             type: string
 *       comments:
 *         type: string
 *       video_link:
 *         type: boolean
 *       victim_details_obtained:
 *         type: boolean
 *       advocate_details:
 *         type: string
 *       witness_details:
 *         type: string
 *       panel_details:
 *         type: string
 *       solicitor:
 *         type: object
 *         properties:
 *           firm:
 *             type: string
 *           address:
 *             type: string
 *           phone_number:
 *             type: string
 *           fax_number:
 *             type: string
 *           email_address:
 *             type: string
 *       reason:
 *         type: object
 *         properties:
 *           description:
 *             type: string
 *       documents:
 *         type: array
 *         items:
 *           $ref: '#/definitions/Document'
 */

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
      documents: {
        relation: Model.HasManyRelation,
        modelClass: Document,
        join: {
          from: "REVIEW.REVIEW_ID",
          to: "DOCUMENTS.REVIEW",
        },
      },
    };
  }
}

module.exports = Review;
