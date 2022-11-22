const service = require("../services/nft.service");
const contract = require("../process/contract.process");

// API 12. NFT 발행 (Deploy) 요청
exports.post_nft_deploy = async (req, res, next) => {
  try {
    const { club_id, meta_cid, deploy_count } = req.body;
    console.log(club_id, meta_cid, deploy_count);
    if (!(club_id && meta_cid && deploy_count))
      return res.status(404).json({ data: "입력정보가 부족합니다" });

    // 운영자가 NFT 발행을 하는 함수 구현 필요
    const contract_address = await contract.DeployNFT(
      club_id,
      meta_cid,
      deploy_count
    );

    if(typeof contract_address !== "undefined") {
      // 발행을 한 NFT 정보를 database에 insert 하는 함수 구현 필요
      const result_db = await service.setNFTDeploy(club_id, meta_cid, contract_address); //  파라메터는 변경 가능 
    }

    ///////////////////test code ////////////////
    return res.status(200).json({
      data: { tx_hash: "0xeiiherhgheroghehgoihqwgihrf" },
    });
    ///////////////////test code ////////////////
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};

// API 13. NFT 민팅 요청
exports.get_nft_mint = async (req, res, next) => {
    try {
      const address = req.params.address;
      const club_id = req.params.club_id;
      console.log(address);
      if (!(address && club_id))
          return res.status(404).json({"data": "입력정보가 부족합니다"});

      //database 에서 club_id 에 맞는 contract address 를 가져오는 함수 필요
      const contract_add = await service.getContractAddress(club_id);    
      // 운영자가 NFT 민팅하여 클라이언트 계정에 전송하는 함수 구현 필요
      const token_ID = await contract.MintNFT(address, contract_add);
      if(typeof token_ID !== "undefined") {
        // minting을 한 계정의 NFT 정보를 database에 insert 하는 함수 구현 필요
          const result_db = await service.setNFTMint(address, token_ID, club_id);   
      }

      ///////////////////test code ////////////////
      return res.status(200).json({
          "data": {
                    "token_uri" : "ipfs://fnjquiruvurgurq/100.json",
                    "token_id" : "100"
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