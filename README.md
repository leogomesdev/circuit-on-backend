<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<p align="center">Build with <a href="https://nestjs.com" target="_blank">NestJS</a> framework</p>
<p align="center">
<a href="#" target="_blank"><img src="https://img.shields.io/badge/coverage-57.18%25-orange" alt="Coverage" /></a>
</p>

# 🌐 CIRCUIT ON

This is the Backend application.

For Frontend application, please go to [https://github.com/leogomesdev/circuit-on-frontend](https://github.com/leogomesdev/circuit-on-frontend)

## 📚 Description

This project provides APIs for the frontend application

## 📲 Main technologies used

- [NestJS](http://nestjs.com), a Typescript framework for Node.js
- [MongoDB](https://www.mongodb.com) as database
- [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current) for database connection
- [OKTA](https://developer.okta.com) for Authentication
- REST API
- [Jest](https://jestjs.io) for unit tests
- [Commitizen command line tool](https://github.com/commitizen/cz-cli)
- [Conventional Commits specification](https://www.conventionalcommits.org/en/v1.0.0/)

## 💡 Requirements

### 💻 For local usage:

- [Node.js](https://nodejs.org) (v16 or v18)
- [npm](https://www.npmjs.com)
- [MongoDB](https://mongodb.com) database. Highly recommended to [Deploy a Free Cluster at MongoDB Atlas](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster)

## 🚀 Running

### 💻 Locally

- Be sure to install the [requirements](#requirements)
- If using [nvm](github.com/nvm-sh/nvm), you can easily run:

  ```bash
  $ nvm use
  ```

- Create .env file:

  ```bash
  $ cp -v .env.example .env
  ```

- Edit .env file to provide the required environment variables.

- Install dependencies:

  ```bash
  $ npm install
  ```

- Start the application:

  ```bash
  # development
  $ npm run start

  # watch mode
  $ npm run start:dev
  ```

### Production Environment

Follow [this doc for instructions](docs/deploy-aws-runner.md)

### ✅ Tests

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## MongoDB Indexes

Please create indexes for supporting your application complex aggregation pipelines.
Follow [this doc for instructions](docs/mongodb-indexes.md)

## 🔗 Usage

Consult the API documentation available at Swagger [http://localhost:3000/api](http://localhost:3000/api)

To generate and download a Swagger JSON file, navigate to [http://localhost:3000/api-json](http://localhost:3000/api-json)

### 👀 TL;DR

1. Create an OKTA Application (for Authentication). Follow [this doc for instructions](docs/okta.md)
2. Open Postman and make API calls. Follow [this doc for instructions](docs/postman.md)
