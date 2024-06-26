const express = require("express");
const categoryContoller = require("./../../controllers/v1/category");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");
const router = express.Router();

router
  .route("/")
  .post(authMiddleware, isAdminMiddleware, categoryContoller.create)
  .get(categoryContoller.getAll);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, categoryContoller.remove)
  .put(authMiddleware, isAdminMiddleware, categoryContoller.update);

module.exports.router;
