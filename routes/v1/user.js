const express = require("express");
const userContoller = require("./../../controllers/v1/user");
const authMiddleware = require("./../../middlewares/auth");
const isAdminMiddleware = require("./../../middlewares/isAdmin");
const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, userContoller.getAll)
  .put(authMiddleware, userContoller.updateUser);

router
  .route("/:id")
  .delete(authMiddleware, isAdminMiddleware, userContoller.removeUser);
router
  .route("/role")
  .put(authMiddleware, isAdminMiddleware, userContoller.changeRole);

router
  .route("/ban/:id")
  .post(authMiddleware, isAdminMiddleware, userContoller.banUser);

module.exports = router;
