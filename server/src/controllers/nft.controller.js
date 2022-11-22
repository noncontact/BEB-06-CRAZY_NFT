//const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const service = require("../services/nft.service");

// API 12. NFT 발행 (Deploy) 요청
exports.post_nft_deploy = async (req, res, next) => {
    try {
      const { club_id, meta_cid, deploy_count } = req.body;
      console.log(club_id, meta_cid, deploy_count );
      if (!(club_id && meta_cid && deploy_count ))
        return res.status(404).json({"data": "입력정보가 부족합니다"});

      // 운영자가 NFT 발행을 하는 함수 구현 필요
      const result_data = await service.setNFTDeploy(club_id, meta_cid, deploy_count);
      ///////////////////test code ////////////////
        return res.status(200).json({
          "data": {"tx_hash" : "0xeiiherhgheroghehgoihqwgihrf" }
      });
      ///////////////////test code ////////////////

    }
    catch (err) {
        return res.status(404).json({
          "data": "fail"
        });
    }
}

// API 13. NFT 민팅 요청
exports.get_nft_mint = async (req, res, next) => {
    try {
      const address = req.params.address;
      console.log(address);
      if (!address)
          return res.status(404).json({"data": "입력정보가 부족합니다"});

      // 운영자가 NFT 민팅하여 클라이언트 계정에 전송하는 함수 구현 필요
      //const result_data = await service.setNFTMint(address);
      ///////////////////test code ////////////////
      return res.status(200).json({
          "data": {
                    "token_uri" : "ipfs://fnjquiruvurgurq",
                    "token_id" : "23422"
                  } 
      });
      ///////////////////test code ////////////////
    }
    catch (err) {
        return res.status(404).json({
          "data": "fail"
        });
    }
}


