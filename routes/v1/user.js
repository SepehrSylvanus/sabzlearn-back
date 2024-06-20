const express = require("express");
const userContoller = require("./../../controllers/v1/user");
const router = express.Router();

router.route("/ban/:id").post(userContoller.banUser);

module.exports = router;
