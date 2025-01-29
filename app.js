// IMPORTS:
const express = require("express");
const app = express();
const controller = require("./controller/controller");

// REQUESTS:
app.get("/api", controller.getEndpoints);
app.get("/api/topics", controller.getTopics);
app.get("/api/articles", controller.getArticles);
app.get("/api/articles/:article_id", controller.getArticleById);
app.get("/api/articles/:article_id/comments", controller.getCommentsOfArticle);
app.get("/api/articles", controller.getArticles);

// ERROR-HANDLING MIDDLEWARE:
app.use((req, res) => {
  res.status(404).send({ error: "Endpoint Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ error: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ error: err.message });
  } else {
    console.log(err, "<---- Error not yet handled!"); // this console log is for the developer to see if anymore error handling can be setup, rather than defaulting to the generic 500 error
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// EXPORTS:
module.exports = app;
