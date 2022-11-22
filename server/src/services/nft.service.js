const { NFT } = require("#src/models/index.js");

// 나의 NFT 목록
exports.getMyNFTs = async (userId, address) => {
  return await NFT.findAll({
    where: { UserId: userId },
  });
};

exports.setNFTDeploy = async (clubId, metaCid, deployCount) => {
  // NFT 발행 함수 구현 필요
};

exports.setNFTMint = async (address) => {
  // NFT mint 함수 구현 필요 
  
};
