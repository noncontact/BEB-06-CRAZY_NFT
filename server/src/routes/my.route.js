const express = require("express");
const router = express.Router();
//const { isLoggedIn } = require("./middleware.js");
const controller = require("../controllers/my.controller");
//const upload = require("./upload.js");

router.use(express.json());
router.use(express.urlencoded({extended:true}));

/* my router listing. */
// API 9-1. 일반 회원 MyPage 에서 나의 정보 조회 (나의 상세 정보)
router.get("/detail/:address", controller.get_detail);
// API 9-2. 일반 회원 MyPage 에서 나의 정보 조회 (나의 가입 클럽)
router.get("/club/:address", controller.get_club);
// API 9-3. 일반 회원 MyPage 에서 나의 정보 조회 (나의 보유 NFT)
router.get("/nft/:address", controller.get_nft);
// API 9-4. 일반 회원 MyPage 에서 나의 정보 조회 (나의 작성 게시글)
router.get("/content/:address", controller.get_content);
// API 10. 운영자 MyPage 에서 정보 조회 (가입을 요청한 회원 정보 조회)
router.get("/admin/info/:address", controller.get_admin_info);
// API 11. 운영자 MyPage 에서 가입 허용 
router.get("/admin/allow/:address/:club_id", controller.get_admin_allow);

module.exports = router;