var express = require("express");
var knexfile = require("./knexfile");
var knex = require("knex")(knexfile);
var app = express();

app.get("/reviews", function (req, res) {
  knex("REVIEW")
    .select()
    .then((rows) => {
      res.json({ reviews: rows });
    })
    .catch((err) => {
      console.log(err);
      throw err;
    })
    .finally(() => {
      knex.destroy();
    });
});

module.exports = { app };
