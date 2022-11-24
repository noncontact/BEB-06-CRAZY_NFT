const {
  setNFTDeploy,
  getContractAddress,
  setNFTMint,
} = require("../services/nft.service");
//const contract = require("../process/contract.process");

// API 12. NFT 발행 (Deploy) 요청
exports.post_nft_deploy = async (req, res, next) => {
  try {
    const { club_id, meta_cid, deploy_count, address } = req.body;
    console.log(club_id, meta_cid, deploy_count);
    if (!(club_id && meta_cid && deploy_count))
      return res.status(404).json({ data: "입력정보가 부족합니다" });

    const contract_address = await contract.DeployNFT(
      club_id,
      meta_cid,
      deploy_count
    );

    if (typeof contract_address !== "undefined") {
      // 발행을 한 NFT 정보를 database에 insert 하는 함수
      await setNFTDeploy(club_id, meta_cid, contract_address, address);
    }

    return res.status(200).json({
      data: { tx_hash: contract_address },
    });
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};

// API 13. NFT 민팅 요청
exports.get_nft_mint = async (req, res, next) => {
  try {
    const { address, club_id } = req.params;
    console.log(address);
    if (!(address && club_id))
      return res.status(404).json({ data: "입력정보가 부족합니다" });

    //database 에서 club_id 에 맞는 contract address 를 가져오는 함수
    const contract_add = await getContractAddress(club_id);
    // 운영자가 NFT 민팅하여 클라이언트 계정에 전송하는 함수
    const token_id = await contract.MintNFT(address, contract_add);
    const { id } = await getUserId(address);
    if (!id) return res.status(404).json({ data: "없는 유저입니다." });

    let result_db = {};
    if (typeof token_ID !== "undefined") {
      // minting을 한 계정의 NFT 정보를 database에 insert 하는 함수 구현 필요
      result_db = await setNFTMint(address, token_id, club_id, id);
    }
    return res.status(200).json({
      data: result_db,
    });
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};
