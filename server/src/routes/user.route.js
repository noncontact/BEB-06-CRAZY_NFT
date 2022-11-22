const express = require("express");
const router = express.Router();
//const { isLoggedIn } = require("./middleware.js");
const controller = require("../controllers/user.controller");
//const upload = require("./upload.js");

/* users router listing. */
// API 1. 회원가입
router.post("/signup", controller.post_signup);
// API 2. 로그인
router.post("/login", controller.post_signin);

module.exports = router;