const { Model } = require("objection");
const { createColumnMappers } = require("../utils");

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
    return `${process.env.SERVER_URL}/documents/${this.id}`;
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
