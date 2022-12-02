const { NFT, NFTUser, TranHash, Deploy} = require("#src/models/index.js");
const { return_function, return_err } = require("#src/process/error.process.js");
// 나의 NFT 목록
exports.getMyNFTs = async (userId) => {
  try {
    const result = await NFTUser.findAll({
      where: { UserId: userId },
      include: [
        {
          model: NFT,
          attributes: ["metaCid", "price"],
        },
      ],
    });
    return return_function (result, false)
  }
  catch (err) {
    return return_err(err)
  }
};

// NFT 발행

exports.setNFTDeploy = async (
  ClubId,
  metaCid,
  nft_price,
  deployCount,
  contractAddress
) => {
  try {
    await NFT.create({
      ClubId,
      metaCid,
      price: nft_price,
      deployCount,
      contractAddress,
    });
    return return_function ("insert")
  }
  catch (err) {
    return return_err(err)
  }
};

// NFT mint -> token_id 유저발행
exports.setNFTMint = async (address, ClubId, tokenId, UserId) => {
  try {
    const NFTdata = await NFT.findOne({
      attributes: ["id"],
      where: { ClubId },
    });

    if (NFTdata !== null) {
      await NFTUser.create({
        address,
        tokenId,
        NFTId: NFTdata.id,
        UserId,
      });
      return return_function ("insert")
    }
    else {
      return return_function (NFTdata)
    }
  }
  catch (err) {
    return return_err(err)
  }
};

// club_id 로 contract address DB search
exports.getContractAddress = async (ClubId) => {
  try {
    const result = await NFT.findOne({
      attributes: ["metaCid", "contractAddress", "deployCount", "price"],
      where: { ClubId },
    });
    return return_function (result)
  }
  catch (err) {
    return return_err(err)
  }
};

// transaction History 테이블에 회원 account (address), tx_hash 를 insert 하는 함수
exports.setTransHash = async (UserId, tx_hash) => {
  try {
    await TranHash.create({
      tx_hash,
      UserId,
    });
    return return_function ("insert")
  }
  catch (err) {
    return return_err(err)
  }
};

exports.checkTransHash = async (tx_hash) => {
  // transaction History 테이블에서 tx_hash 를 검색하여 데이터가 있는지 확인하는 함수 필요
  // return true: 있는 경우 false : 없는 경우
  try{
    const result = await TranHash.findOne({
      attributes: ["tx_hash"],
      where: { tx_hash }
    });
    return return_function (result)
  }
  catch (err) {
    return return_err(err)
  }
};

exports.getNFTAllInfo = async (ClubId) => {
  try {
    const data = await NFT.findOne({
      attributes: ["metaCid", "id"],
      where: { ClubId }
    });

    if(data !== null) {
      const res_query = await NFTUser.findAll({
        attributes: ["address", "tokenId"],
        where: { NFTId : data.id }
      });

      if(res_query !== null) {
        let arry = []
        for(let i= 0; i<res_query.length; i++) {
          console.log(res_query[i].tokenId);
          const obj = new Object();
          obj.address = res_query[i].address;
          obj.token_uri = data.metaCid;
          obj.token_id = res_query[i].tokenId;
          arry.push(obj);
        }
       
        //console.log(arry);
        return return_function (arry, false)
      }
      return return_function (res_query)
    }
    return return_function (data)
  }
  catch (err) {
    return return_err(err)
  }
}

exports.checkDeploy = async(Club_Id) => {
  try {
    const result = await Deploy.findOne({
      attributes: ["id"],
      where: { Club_Id }
    });
    return return_function (result)
  }
  catch (err) {
    return return_err(err)
  }
}

exports.setDeploy = async(Club_id, use) => {
  try {
    console.log("insert------------")
    await Deploy.create({
      use,
      Club_id,
    });
    return return_function ("insert")
  }
  catch (err) {
    return return_err(err)
  }
}