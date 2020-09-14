const { Model, snakeCaseMappers } = require('objection');

class Review extends Model {
  static get tableName() {
    return 'REVIEW';
  }
  static get columnNameMappers() {
    return {
        parse(obj) {
          return {
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
                  email_address: obj.SOLICITOR_EMAIL
              }
          }
        },
    
        format(obj) {
          throw 'Not implemented'
        }
    }
  }
}

module.exports = Review;
