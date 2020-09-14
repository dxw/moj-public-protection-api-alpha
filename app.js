const express = require("express");
const knexfile = require("./knexfile");
const knex = require("knex")(knexfile);
const { Model } = require('objection');
const app = express();
Model.knex(knex);
const Review = require("./models/review")

app.get("/reviews", async function (req, res) {
  const reviews = await Review.query();
  res.json({ reviews: reviews });
});

module.exports = { app };
