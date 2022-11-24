const express = require("express");
const router = express.Router();
//const { isLoggedIn } = require("./middleware.js");
const controller = require("../controllers/nft.controller");
//const upload = require("./upload.js");

/* nft router listing. */
// API 12. NFT 발행 (Deploy) 요청
router.post("/deploy", controller.post_nft_deploy);
// API 13. NFT 민팅 요청
router.get("/mint/:address", controller.get_nft_mint);

module.exports = router;