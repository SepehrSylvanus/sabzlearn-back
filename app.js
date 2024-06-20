const express = require("express");
const authRouter = require("./routes/v1/auth");
const cors = require("cors");
const path = require("path");
const bodyParses = require("body-parser");

const app = express();

app.use(
  "/courses/covers",
  express.static(path.join(__dirname, "public", "courses", "covers"))
);
app.use(cors());
app.use("/v1/auth", authRouter);
app.use(bodyParses.urlencoded({ extended: false }));
app.use(bodyParses.json());

module.exports = app;
