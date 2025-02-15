# NC News API

Welcome to the **NC News API**! This is the backend API for the NC News project, built with **Node.js**, **Express**, and **PostgreSQL**. It provides endpoints for accessing articles, comments, topics, and users, and is designed to be fast, reliable, and easy to use.

## Hosted Version

The API is hosted on **Render**. You can explore it here:

👉 [https://backend-news-project-mdgt.onrender.com/api](https://backend-news-project-mdgt.onrender.com/api)

## Project Summary

The NC News API powers a news aggregation platform, similar to Reddit. It allows users to:

- Read articles and comments.
- Post new comments.
- Vote on articles.
- Filter and sort articles by topic, date, or popularity.

The API is built with a focus on RESTful principles and includes features like:

- **Filtering**: Articles can be filtered by topic.
- **Sorting**: Articles can be sorted by any valid column (e.g., `created_at`, `votes`).
- **Pagination**: Coming soon!

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- **Node.js**: Minimum version 18.x
- **PostgreSQL**: Minimum version 14.x

### Installation

Clone the repository:

```bash
git clone https://github.com/SchubertAlex/nc-news-project.git
```

Navigate to the project directory:

```bash
cd nc-news-project
```

Install dependencies:

```bash
npm install
```

### Set up the database

Create two `.env` files for your environment variables:

- `.env.development` with `PGDATABASE=<your_development_database_name>`
- `.env.test` with `PGDATABASE=<your_test_database_name>`

Replace `<your_development_database_name>` and `<your_test_database_name>` with the names of your local development and test databases.

Run the following commands to set up and seed the databases:

```bash
npm run setup-dbs
npm run seed
```

## Running the Server

To start the server in development mode, run:

```bash
npm run dev
```

The server will be available at [http://localhost:9090](http://localhost:9090).

## Running the Tests

To run the test suite, use the following command:

```bash
npm test
```

## API Endpoints

### Get All Articles

```bash
GET /api/articles
```

### Get a Single Article

```bash
GET /api/articles/1
```

### Get Comments for an Article

```bash
GET /api/articles/1/comments
```

### Post a Comment

```bash
POST /api/articles/1/comments
```

#### Request Body:

```json
{
  "username": "butter_bridge",
  "body": "This is a new comment."
}
```

### Update Article Votes

```bash
PATCH /api/articles/1
```

#### Request Body:

```json
{
  "inc_votes": 10
}
```

### Delete a Comment

```bash
DELETE /api/comments/1
```

## .env Files

The project requires two `.env` files for environment variables:

### `.env.development:`

```env
PGDATABASE=<your_development_database_name>
```

### `.env.test:`

```env
PGDATABASE=<your_test_database_name>
```

These files are used to connect to the development and test databases, respectively.

## Technologies Used

- **Node.js**: Runtime environment.
- **Express**: Web framework for building the API.
- **PostgreSQL**: Database for storing articles, comments, and users.
- **Render**: Hosting platform for the live API.

## Author

**Alex Schubert**: [GitHub](https://github.com/SchubertAlex) | [LinkedIn](https://linkedin.com/in/schubertalex/)

## Acknowledgments

This project was completed as part of the [Northcoders](https://northcoders.com/) Bootcamp in Software Development. Special thanks to my instructors and peers for their support and feedback!
