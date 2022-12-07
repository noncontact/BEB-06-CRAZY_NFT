const express = require("express");
const router = express.Router();


const mainRouter = require("./main.route.js");
const userRouter = require("./user.route.js");
const clubRouter = require("./club.route.js");
const myRouter = require("./my.route.js");
const nftRouter = require("./nft.route.js");

router.use("/", mainRouter);
router.use("/user", userRouter);
router.use("/club", clubRouter);
router.use("/my", myRouter);
router.use("/nft", nftRouter);


module.exports = router;
