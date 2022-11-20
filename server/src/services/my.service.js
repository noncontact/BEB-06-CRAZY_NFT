const { db } = require("#src/models/index.js");
const Club = require("../models/club");
const { User, Post, NFT } = db;

// 나의 정보 가져오기
exports.getMyDetail = async (address) => {
  return await User.findOne({
    attributes: ["id", "nickname", "profileurl", "address", "createdAt"],
    where: { address },
  });
};

// 나의 작성글 목록 가져오기
exports.getMyContents = async (user_id, address) => {
  // 각 클럽별로 글 나의 작성글 구현 필요
  return await Post.findAll({
    where: { UserId: user_id },
  });
};

// 나의 NFT 목록
exports.getMyNFTs = async (user_id, address) => {
  return await NFT.findAll({
    where: { UserId: user_id },
  });
};

// 나의 Club 목록
exports.getMyClubs = async (user_id, address) => {
  return await User.findAll({ 
    where: { UserId: user_id },
    required: false, // left outer join이 되게 한다.
    include: [
      {
        model: Club,
        order: [["createdAt", "DESC"]], 
      },
    ],
  });
};


exports.getAdminInfo = async (address) => {
  // 데이터베이스에서 운영자의 정보 쿼리 함수 구현 필요 -> 가입을 희망하는 회원리스트 쿼리
  const result = await db_proc.query_AdminInfo(address);
  return result;
};


exports.setAdminAllow = async (address) => {
  // 데이터베이스에서 운영자가 가입허락 쿼리 함수 구현 필요 -> 가입을 허락하는 쿼리
  const result = await db_proc.query_AdminAllow(address);
  return result;
};
