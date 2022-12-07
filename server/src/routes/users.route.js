const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("./middleware.js");
const {
  signin,
  signout,
  signup,
  info,
  edit,
  follow,
} = require("@src/controllers/user.controller.js");
const upload = require("./upload.js");

/* users router listing. */
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/signup", signup);
router.get("/info", isLoggedIn, info);
router.post("/edit", isLoggedIn, upload.single("image"), edit);
router.post("/follow/:id", isLoggedIn, follow);
