const { NFT } = require("#src/models/index.js");

// 나의 NFT 목록
exports.getMyNFTs = async (userId, address) => {
  return await NFT.findAll({
    where: { UserId: userId },
  });
};

exports.setNFTDeploy = async (clubId, metaCid, contract_address) => {
  // NFT 발행에 따른 clubId, metaCid, contract_address 를 insert 하는 함수 구현 필요
    return "success"    
};

exports.setNFTMint = async (address, club_id, token_ID) => {
  // NFT mint 후 token_id를 insert 하는 함수 구현 필요 
  return "success"
};

exports.getContractAddress = async(club_id) => {
    // club_id 로 contract address DB search 
    let contract_address;
    return contract_address;
}