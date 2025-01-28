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
      res.status(200).send(topics);
    })
    .catch(next); // this sends any errors to the 500 middleware
}

// EXPORTS:
module.exports = { getEndpoints, getTopics };
