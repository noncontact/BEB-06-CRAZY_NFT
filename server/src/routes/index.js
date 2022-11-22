const express = require("express");
const router = express.Router();

const usersRouter = require("./users.route.js");
const postRouter = require("./post.route.js");
const contractRouter = require("./contract.route.js");
const commentRouter = require("./comment.route.js");

router.use("/user", usersRouter);
router.use("/post", postRouter);
router.use("/comment", commentRouter);
router.use("/contract", contractRouter);

module.exports = router;
