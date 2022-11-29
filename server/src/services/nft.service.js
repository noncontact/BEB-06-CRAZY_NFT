const { NFT, NFTUser } = require("#src/models/index.js");

// 나의 NFT 목록
exports.getMyNFTs = async (userId) => {
  return await NFT.findAll({
    where: { UserId: userId },
  });
};

// NFT 발행
exports.setNFTDeploy = async (
  ClubId,
  metaCid,
  nft_price,
  deployCount,
  contractAddress,
  address
) => {
  return await NFT.create({
    ClubId,
    metaCid,
    price: nft_price,
    deployCount,
    contractAddress,
    AdminAddress: address, // 발행 운영자 계정
  });
};

// NFT mint -> token_id 유저발행
exports.setNFTMint = async (address, ClubId, tokenId, UserId) => {
  const NFTdata = await NFT.findOne({
    attributes: ["id"],
    where: { ClubId },
  });

  if (NFTdata) {
    return await NFTUser.create({
      address,
      tokenId,
      NFTId: NFTdata.id,
      UserId,
    });
  }
};

// club_id 로 contract address DB search
exports.getContractAddress = async (ClubId) => {
  return await NFT.findOne({
    attributes: ["metaCid", "contractAddress", "deployCount", "price"],
    where: { ClubId },
  });
};
