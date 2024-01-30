const express = require("express");

const booksRouter = require("./books.router");
const categoriesRouter = require("./books.category.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/books", booksRouter);
  router.use("/categories", categoriesRouter);
}

module.exports = routerApi;
