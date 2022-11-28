const { NFT, NFTUser } = require("#src/models/index.js");

// 나의 NFT 목록
exports.getMyNFTs = async (userId) => {
  return await NFT.findAll({
    where: { UserId: userId },
  });
};

// NFT 발행
exports.setNFTDeploy = async (ClubId, metaCid, contractAddress, address) => {
  return await NFT.create({
    ClubId,
    metaCid,
    contractAddress,
    AdminAddress: address, // 발행 운영자 계정
  });
};

// NFT mint -> token_id 유저발행
exports.setNFTMint = async (address, ClubId, tokenId, UserId) => {
  const NFTId = await NFT.findOne({
    attributes: ["id"],
    where: { ClubId },
  });

  if(NFTId){
    return await NFTUser.create({
      address,
      tokenId,
      NFTId,
      UserId
    });
  }
};

// club_id 로 contract address DB search
exports.getContractAddress = async (ClubId) => {
  return await NFT.findOne({
    attributes: ["contractAddress"],
    where: { ClubId },
  });

  // return example
  // const data = {
  //   contract_add : "address",
  //   deploy_count : 30,
  //   token_URI : "ipfs://xxxxxxxx",
  //   price : 1000000000000
  // }
  // return data;
};

