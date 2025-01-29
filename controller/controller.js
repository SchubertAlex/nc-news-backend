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

function getArticles(req, res, next) {
  model
    .fetchArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

function getArticleById(req, res, next) {
  const { article_id } = req.params;
  model
    .fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    }); // if the promise rejects in the model, it is caught here and sent to the dynamic error handling middleware
}

function getCommentsOfArticle(req, res, next) {
  const { article_id } = req.params;

  model
    .fetchComments(article_id)
    .then((comments) => {
      if (comments.length === 0) {
        res
          .status(200)
          .send({ comments: "no comments for this article found" });
      }
      res.status(200).send({ comments });
    
function getArticles(req, res, next) {
  model
    .fetchArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

// EXPORTS:
module.exports = {
  getEndpoints,
  getTopics,
  getArticleById,
  getArticles,
  getCommentsOfArticle,
};
