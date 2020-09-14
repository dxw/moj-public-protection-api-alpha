const express = require("express");
const knexfile = require("./knexfile");
const knex = require("knex")(knexfile);
const { Model } = require('objection');
const app = express();
Model.knex(knex);
const Review = require("./models/Review")

app.get("/reviews", async function (req, res) {
  const query = Review.query();
  query.withGraphJoined('[reason]')
  res.json({ reviews: await query });
});

module.exports = { app };
