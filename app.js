const express = require("express");
const knexfile = require("./knexfile");
const knex = require("knex")(knexfile);
const { Model } = require("objection");
const app = express();
Model.knex(knex);
const Review = require("./models/Review");
const Offender = require("./models/Offender");

app.get("/reviews", async function (req, res) {
  const query = Review.query();
  query.withGraphJoined("[reason,offender]");
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
  query.withGraphJoined("[reason,offender]");
  res.json({ reviews: await query });
});

module.exports = { app };
