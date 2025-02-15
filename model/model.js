// IMPORTS:
const db = require("../db/connection");

// FUNCS:
function fetchTopics() {
  return db.query("SELECT * FROM topics").then((response) => {
    return response.rows;
  });
}

function fetchArticles(sort_by = "created_at", order = "desc", topic = null) {
  const validSortedBy = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validOrderedBy = ["asc", "desc"];

  if (!validSortedBy.includes(sort_by)) {
    return Promise.reject({ status: 400, message: "Invalid sort_by query" });
  }
  if (!validOrderedBy.includes(order)) {
    return Promise.reject({ status: 400, message: "Invalid order query" });
  }

  if (validSortedBy.includes(sort_by) && validOrderedBy.includes(order)) {
    let sortColumn = `articles.${sort_by}`;

    if (sort_by === "comment_count") {
      sortColumn = "COUNT(comments.article_id)";
    }

    let sqlString = `SELECT 
      articles.author, 
      articles.title, 
      articles.article_id, 
      articles.topic, 
      articles.created_at, 
      articles.votes, 
      articles.article_img_url, 
      COUNT(comments.article_id) AS comment_count 
    FROM articles 
    LEFT JOIN comments ON articles.article_id = comments.article_id `;

    if (topic) {
      sqlString += ` WHERE articles.topic = $1`;
    }

    sqlString += ` GROUP BY articles.article_id 
        ORDER BY ${sortColumn} ${order}`;

    const queryParams = topic ? [topic] : [];

    return db.query(sqlString, queryParams).then((response) => {
      if (topic && response.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Topic Not Found" });
      }
      return response.rows;
    });
  }
}

function fetchUsers() {
  return db.query("SELECT * FROM users").then((response) => {
    return response.rows;
  });
}

function fetchArticleById(article_id) {
  const sqlString = `SELECT 
    articles.*, 
    COUNT(comments.comment_id) AS comment_count 
  FROM articles 
  LEFT JOIN comments ON articles.article_id = comments.article_id 
  WHERE articles.article_id = $1 
  GROUP BY articles.article_id`;

  return db.query(sqlString, [article_id]).then((response) => {
    if (response.rows.length === 0) {
      return Promise.reject({ status: 404, message: "Article Not Found" });
    } else {
      return response.rows[0];
    }
  });
}

function fetchComments(article_id) {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at", [
      article_id,
    ])
    .then((response) => {
      return response.rows;
    });
}

function addComment(article_id, username, body) {
  return db
    .query(
      `INSERT INTO comments (article_id, author, body) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [article_id, username, body]
    )
    .then((response) => {
      return response.rows[0];
    });
}

function updateArticleVotes(article_id, inc_votes) {
  return db
    .query(
      `UPDATE articles
     SET votes = votes + $1
     WHERE article_id = $2
     RETURNING *`,
      [inc_votes, article_id]
    )
    .then((result) => {
      return result.rows[0];
    });
}

function deleteComment(comment_id) {
  return db
    .query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [
      comment_id,
    ])
    .then((response) => {
      if (response.rows.length === 0) {
        return Promise.reject({ status: 404, message: "Comment Not Found" });
      }
    });
}

// EXPORTS:
module.exports = {
  fetchTopics,
  fetchArticles,
  fetchUsers,
  fetchArticleById,
  fetchComments,
  addComment,
  updateArticleVotes,
  deleteComment,
};
