const express = require("express");
const fs = require("fs");
const mime = require("mime-types");
const knexfile = require("./knexfile");
const knex = require("knex")(knexfile);
const { Model } = require("objection");
const swaggerDef = require("./swaggerDef");
const swaggerUi = require("swagger-ui-express");
const app = express();
Model.knex(knex);
const Review = require("./models/Review");
const Offender = require("./models/Offender");
const Document = require("./models/Document");

/**
 * @swagger
 *
 * /reviews:
 *   get:
 *     description: List all the reviews
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Review'
 */
app.get("/reviews", async function (req, res) {
  const query = Review.query();
  query.withGraphJoined("[reason,offender,documents]");
  res.json({ reviews: await query });
});

/**
 * @swagger
 *
 * /offender/:identifier/:value/reviews:
 *   get:
 *     description: List all the reviews for a specific offender
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: identifier
 *         description: The offender identifier name
 *         type: string
 *         enum:
 *             - croNumber
 *             - prisonNumber
 *         required: true
 *       - in: path
 *         name: value
 *         description: The value of the offender identifier
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Review'
 *       400:
 *         description: Malformed request
 */
app.get("/offender/:identifier/:value/reviews", async function (req, res) {
  const allowedIdentifiers = ["croNumber", "prisonNumber"];
  if (!allowedIdentifiers.includes(req.params.identifier)) {
    res
      .status(400)
      .json({ error: `Offender identifier must be ${allowedIdentifiers}` });
  }
  const columnName = Offender.propertyNameToColumnName(req.params.identifier);
  const subQuery = Offender.query().where(columnName, req.params.value);
  const query = Offender.relatedQuery("reviews").for(subQuery);
  query.withGraphJoined("[reason,offender,documents]");
  res.json({ reviews: await query });
});

/**
 * @swagger
 *
 * /documents/:documentId/download:
 *   get:
 *     description: Download a document
 *     produces:
 *       - application/pdf
 *     parameters:
 *       - in: path
 *         name: documentId
 *         description: The document ID
 *         type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: file
 *       403:
 *         description: Not authorised
 */
app.get("/documents/:documentId/download", async function (req, res) {
  const document = await Document.query().findById(req.params.documentId);
  if (document.canBeDownloaded()) {
    const path = `./documents/${document.id}.${document.extension}`;
    const file = fs.createReadStream(path);
    const stat = fs.statSync(path);
    res.setHeader("Content-Length", stat.size);
    res.setHeader("Content-Type", mime.contentType(document.extension));
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${encodeURIComponent(document.title)}.${
        document.extension
      }`
    );
    file.pipe(res);
  } else {
    res.status(403).json({ error: `Access denied` });
  }
});

app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDef);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDef));

module.exports = { app };
