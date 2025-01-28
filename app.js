// IMPORTS:
const express = require("express");
const app = express();
const controller = require("./controller/controller");

app.use(express.json());

// REQUESTS:
app.get("/api", controller.getEndpoints);
app.get("/api/topics", controller.getTopics);
app.get("/api/articles/:article_id", controller.getArticleById);

// ERROR-HANDLING MIDDLEWARE:
app.use((req, res) => {
  res.status(404).send({ error: "Endpoint Not Found" });
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
