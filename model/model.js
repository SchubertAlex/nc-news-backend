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

// EXPORTS:
module.exports = { fetchTopics, fetchArticleById };
