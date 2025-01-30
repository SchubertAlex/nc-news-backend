// IMPORTS:
const express = require("express");
const app = express();
const controller = require("./controller/controller");

app.use(express.json());

// REQUESTS:
app.get("/api", controller.getEndpoints);
app.get("/api/topics", controller.getTopics);
app.get("/api/articles", controller.getArticles);
app.get("/api/users", controller.getUsers);
app.get("/api/articles/:article_id", controller.getArticleById);
app.get("/api/articles/:article_id/comments", controller.getCommentsOfArticle);

app.post("/api/articles/:article_id/comments", controller.postComment);

app.patch("/api/articles/:article_id", controller.patchArticleById);

app.delete("/api/comments/:comment_id", controller.deleteComment);

// ERROR-HANDLING MIDDLEWARE:
app.use((req, res) => {
  res.status(404).send({ error: "Endpoint Not Found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ error: "Bad Request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ error: "User Not Found" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.status && err.message) {
    res.status(err.status).send({ error: err.message });
  } else {
    console.log(err, "<---- Error not yet handled!");
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// EXPORTS:
module.exports = app;
