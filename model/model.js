// IMPORTS:
const db = require("../db/connection");

// FUNCS:
function fetchTopics() {
  return db.query("SELECT * FROM topics").then((response) => {
    return response.rows;
  });
}

function fetchArticleById(id) {
  return db
    .query("SELECT * FROM articles WHERE article_id = $1", [id])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Article Not Found" });
      } else {
        return response.rows[0];
      }
    });
}

function fetchArticles() {
  return db
    .query(
      "SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id GROUP BY articles.article_id ORDER BY created_at DESC"
    )
    .then((response) => {
      return response.rows;
    });
}

function fetchComments(id) {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at", [
      id,
    ])
    .then((response) => {
      return response.rows;
    });
}

// EXPORTS:
module.exports = {
  fetchTopics,
  fetchArticleById,
  fetchArticles,
  fetchComments,
};
