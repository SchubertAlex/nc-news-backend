// IMPORTS:
const express = require("express");
const app = express();
const controller = require("./controller/controller");

app.use(express.json());

// REQUESTS:
app.get("/api", controller.getEndpoints);
app.get("/api/topics", controller.getTopics);

// ERROR-HANDLING MIDDLEWARE:
app.use((req, res, next) => {
  res.status(404).send({ error: "Endpoint not found" });
  next();
});

app.use((err, req, res, next) => {
  console.log(err, "<---- Error not yet handled!");
  res.status(500).send({ error: "Internal server error" });
});

// EXPORTS:
module.exports = app;
