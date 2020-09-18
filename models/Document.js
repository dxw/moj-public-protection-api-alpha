const { Model } = require("objection");
const { createColumnMappers } = require("../utils");

/**
 * @swagger
 *
 * definitions:
 *   Document:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *       type:
 *         type: string
 *       title:
 *         type: string
 *       comments:
 *         type: string
 *       extension:
 *         type: string
 *       draft:
 *         type: boolean
 *       fileUrl:
 *         type: string
 *
 */

class Document extends Model {
  static get virtualAttributes() {
    return ["fileUrl"];
  }
  static get tableName() {
    return "DOCUMENTS";
  }
  static get idColumn() {
    return "ID";
  }
  fileUrl() {
    return `${process.env.SERVER_URL}/documents/${this.id}/download`;
  }
  canBeDownloaded() {
    // Check the requesting user has permission to download the file
    // For prototyping purposes we will always return true
    return true;
  }
  static get columnNameMappers() {
    return createColumnMappers({
      ID: "id",
      DOCUMENT_TYPE: "type",
      DOCUMENT_TITLE: "title",
      FILE_EXTENSION: "extension",
      COMMENTS: "comments",
      DRAFT: "draft",
    });
  }
  static get relationMappings() {
    const Review = require("./Review");
    return {
      review: {
        relation: Model.BelongsToOneRelation,
        modelClass: Review,
        join: {
          from: "DOCUMENTS.REVIEW",
          to: "REVIEW.REVIEW_ID",
        },
      },
    };
  }
}

module.exports = Document;
