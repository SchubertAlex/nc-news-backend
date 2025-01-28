// IMPORTS:
const endpoints = require("../endpoints.json");
const model = require("../model/model");

// FUNCS:
function getEndpoints(req, res) {
  res.status(200).send({ endpoints });
}

function getTopics(req, res, next) {
  model
    .fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    }); // this sends any errors to the 500 middleware
}

function getArticleById(req, res, next) {
  const { article_id } = req.params;

  if (isNaN(article_id)) {
    return res.status(400).send({ error: "Bad Request" });
  } // if parametric endpoint isn't a number, it is caught here and sent to the dynamic error handling middleware

  model
    .fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    }); // if the promise rejects in the model, it is caught here and sent to the dynamic error handling middleware
}

// EXPORTS:
module.exports = { getEndpoints, getTopics, getArticleById };
