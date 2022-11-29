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
) => {
  return await NFT.create({
    ClubId,
    metaCid,
    price: nft_price,
    deployCount,
    contractAddress
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

exports.setTransHash = async (address, tx_hash) => {
  // transaction History 테이블에 회원 account (address), tx_hash 를 insert 하는 함수 필요
  // return true: 있는 경우 false : 없는 경우  
}

exports.checkTransHash = async (tx_hash) => {
  // transaction History 테이블에서 tx_hash 를 검색하여 데이터가 있는지 확인하는 함수 필요
  // return true: 있는 경우 false : 없는 경우  
}


