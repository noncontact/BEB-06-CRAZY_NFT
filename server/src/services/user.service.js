const { db } = require("#src/models/index.js");
const { User } = db;

// 유저 정보 가져오기
exports.getUser = async (address, password) => {
  return await User.findOne({
    attributes: ["id", "nickname", "profileurl", "address", "createdAt"],
    where: { address, password },
  });
};

// 나의 정보 가져오기
exports.getMyDetail = async (userId) => {
  return await User.findOne({
    attributes: ["id", "nickname", "profileurl", "address", "createdAt"],
    where: { userId },
  });
};

// 유저 생성하기
exports.createUser = async (nickname, password, address, profileurl) => {
  return await User.create({
    nickname,
    password,
    address,
    profileurl,
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

// 좋아요 반응을 추가
exports.setPostLike = async (address, user_id, post_id) => {
  const user = await User.findOne({
    where: { id: user_id },
  });
  if (user) {
    const checkFollow = await user.hasLikePost(parseInt(post_id, 10));
    // 존재할경우 삭제
    if (checkFollow) {
      await user.removeLikePost(parseInt(post_id, 10));
    } else {
      await user.addLikePost(parseInt(post_id, 10));
    }
  }

  if (result !== "error") {
    // 회원에게 보상토큰을 전송하는 함수 구현 필요
    //const contract_result = contract_proc.transmit_Token(address);
  }

  return result;
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
