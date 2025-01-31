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
    });
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

function getUsers(req, res, next) {
  model
    .fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
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
    });
}

function getCommentsOfArticle(req, res, next) {
  const { article_id } = req.params;

  model
    // first, check the article exists:
    .fetchArticleById(article_id)
    .then(() => {
      return model.fetchComments(article_id);
    })
    // then check if the article has comments:
    .then((comments) => {
      if (comments.length === 0) {
        res.status(200).send({ message: "No comments for this article found" });
      } else {
        res.status(200).send({ comments });
      }
    })
    .catch((err) => {
      next(err);
    });
}

function postComment(req, res, next) {
  const { article_id } = req.params;
  const { username, body } = req.body;

  if (!username || !body) {
    return res.status(400).send({
      error: "Bad Request: Missing required fields / malformed input",
    });
  }

  model
    .fetchArticleById(article_id)
    .then(() => {
      return model.addComment(article_id, username, body);
    })
    .then((newComment) => {
      res.status(201).send({ comment: newComment });
    })
    .catch((err) => {
      next(err);
    });
}

function patchArticleById(req, res, next) {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  model
    .fetchArticleById(article_id)
    .then(() => {
      return model.updateArticleVotes(article_id, inc_votes);
    })
    .then((updatedArticle) => {
      res.status(200).send({ article: updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
}

function deleteComment(req, res, next) {
  const { comment_id } = req.params;

  model
    .deleteComment(comment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}

// EXPORTS:
module.exports = {
  getEndpoints,
  getTopics,
  getArticles,
  getUsers,
  getArticleById,
  getCommentsOfArticle,
  postComment,
  patchArticleById,
  deleteComment,
};
