const express = require("express");
const fs = require("fs");
const mime = require("mime-types");
const knexfile = require("./knexfile");
const knex = require("knex")(knexfile);
const { Model } = require("objection");
const app = express();
Model.knex(knex);
const Review = require("./models/Review");
const Offender = require("./models/Offender");
const Document = require("./models/Document");

app.get("/reviews", async function (req, res) {
  const query = Review.query();
  query.withGraphJoined("[reason,offender,documents]");
  res.json({ reviews: await query });
});

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

module.exports = { app };
