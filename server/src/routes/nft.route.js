const express = require("express");
const router = express.Router();
//const { isLoggedIn } = require("./middleware.js");
const controller = require("../controllers/nft.controller");
const multer = require("multer");

router.use(express.json());
router.use(express.urlencoded({extended:true}));

const file_process = require('../process/file.process')


//buffer 형태로 저장
// const upload = multer({
//   storage: multer.memoryStorage(),
// });

// multer storge 저장
const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
      cb(null, process.env.NFT_UPLOAD_PATH)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

//미들웨어 등록- stotage
let upload = multer({
    storage: storage
});

// 미들웨어 등록 - traget dir 
// let upload = multer({
//     dest: 'upload_parts/'
// });

/* nft router listing. */
// API 12. NFT 발행 (Deploy) 요청
router.post("/deploy", controller.post_nft_deploy);
// API 13. NFT 민팅 요청
router.post("/mint", controller.post_nft_mint);
// API 14. 서버 계정(Account) 및 contract address 요청
router.get("/address", controller.get_nft_address);
// 15. NFT 이미지 생성을 위한 Parts 이미지 upload 요청
router.post("/upload", upload.array('img'), controller.post_nft_parts_upload);
// API 17. 클럽 NFT 모두 보기
router.get("/all/:club_id", controller.get_nft_all);
module.exports = router;