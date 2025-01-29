/* Set up your test imports here */
const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const testData = require("../db/data/test-data");

/* Set up your beforeEach & afterAll functions here */
beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});

describe("GET /api/topics", () => {
  test("200: Responds with an array of topic objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const body = response.body;

        expect(Array.isArray(body.topics)).toBe(true);
        for (const topic of body.topics) {
          expect(Object.keys(topic)).toEqual(["slug", "description"]);
        }
        expect(body.topics).toEqual(testData.topicData);
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an article object", () => {
    return request(app)
      .get("/api/articles/3")
      .then((response) => {
        const body = response.body;

        const output = {
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          created_at: "2020-11-03T09:12:00.000Z",
          votes: 0,
          article_img_url:
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
        };

        expect(body.article).toEqual(output);
      });
  });
  test("404: article not found", () => {
    return request(app)
      .get("/api/articles/7227")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("Article Not Found");
      });
  });
  test("400: id is not a number", () => {
    return request(app)
      .get("/api/articles/shrek")
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe("Bad Request");
      });
  });
});

describe("GET /api/articles", () => {
  test("200: Responds with an array of article objects", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((response) => {
        const body = response.body;

        expect(Array.isArray(body.articles)).toBe(true);

        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });

        expect(body.articles.length).toBe(13);
        expect(body.articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with an array of comment objects for the specified article", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((response) => {
        const body = response.body;

        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            body: expect.any(String),
            article_id: expect.any(Number),
            author: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
          });
        });

        expect(body.comments.length).toBe(11);
        expect(body.comments).toBeSortedBy("created_at");
      });
  });
  test("200: responds with a custom message if the article is correct, but has no comments", () => {
    return request(app)
      .get("/api/articles/4/comments")
      .expect(200)
      .then((response) => {
        const body = response.body;

        expect(body).toEqual({
          message: "no comments for this article found",
        });
      });
  });
  test("404: article not found", () => {
    return request(app)
      .get("/api/articles/4000/comments")
      .expect(404)
      .then((response) => {
        expect(response.body.error).toBe("Article Not Found");
      });
  });
  test("400: id is not a number", () => {
    return request(app)
      .get("/api/articles/big-timer/comments")
      .expect(400)
      .then((response) => {
        expect(response.body.error).toBe("Bad Request");
      });
  });
});

test("404: incorrect endpoint", () => {
  return request(app)
    .get("/api/incorrect-endpoint")
    .expect(404)
    .then((response) => {
      expect(response.body.error).toBe("Endpoint Not Found");
    });
});
