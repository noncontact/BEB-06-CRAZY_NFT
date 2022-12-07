const express = require("express");
const router = express.Router();
//const { isLoggedIn } = require("./middleware.js");
const controller = require("../controllers/club.controller");
//const upload = require("./upload.js");

/* club router listing. */
// API 3. 모든 클럽 목록
router.get("/allclub", controller.get_allclub);
// API 4. 클럽 게시글 목록
router.get("/index/:club_id/:category_id", controller.get_index);
// API 5. 게시글 상세보기
router.get("/detail/:post_id", controller.get_detail);
// API 6. 게시글 작성
router.post("/write", controller.post_write);
// API 7. 댓글 작성
router.post("/comment/write", controller.post_comm_write);
// API 8. 좋아요 반응 작성
router.get("/comment/like/:post_id/:address", controller.get_comm_like);
// API 9. advance 클럽 생성 
router.post("/makeclub", controller.post_make_club);
// API 16. 클럽 가입신청
router.post("/signup", controller.post_apply);

module.exports = router;
