const { db } = require("#src/models/index.js");
const { NFT } = db;

// 나의 NFT 목록
exports.getMyNFTs = async (user_id, address) => {
  return await NFT.findAll({
    where: { UserId: user_id },
  });
};

exports.setNFTDeploy = async (club_id, meta_cid, deploy_count) => {
  // NFT 발행 함수 구현 필요
};

exports.setNFTMint = async (address) => {
  // NFT mint 함수 구현 필요 
  if (result !== "error") {
    // 데이터베이스에서 NFT 후 회원이 소유한 NFT 정보를 추가하는 쿼리 함수 구현 필요
    const db_result = db_proc.setMintNFT(address, result.token_URI);
    if (db_result !== "error") return db_result;
  }
  return "error";
};
