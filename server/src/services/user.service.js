const { User } = require("#src/models/index.js");

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
exports.createUser = async (address, password, nickname, profileurl) => {
  return await User.create({
    address,
    password,
    nickname,
    profileurl,
  });
};

// 나의 Club 목록
exports.getMyClubs = async (userId) => {
  return await User.findAll({
    where: { UserId: userId },
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
exports.setPostLike = async (userId, postId) => { // userId => 회원 지갑 주소 입니다.
  const user = await User.findOne({
    where: { id: userId },
  });
  if (user) {
    const check = await user.hasLikePost(parseInt(postId, 10));
    // 존재할경우 삭제
    if (check) {
      await user.removeLikePost(parseInt(postId, 10));
    } else {
      await user.addLikePost(parseInt(postId, 10));
    }
  }
};

// 클럽 가입신청
exports.setUserClub = async (userId, clubId) => {
  const user = await User.findOne({
    where: { id: userId },
  });
  if (user) {
    return await user.addApplyClub(parseInt(clubId, 10));
  }
}

