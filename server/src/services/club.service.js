const { User, Club, UserClub } = require("#src/models/index.js");

// 모든 클럽정보 가져오기
exports.getAllClub = async () => {
  return await Club.findAll({
    attributes: ["id", "title", "img", "createdAt", "AdminId"],
    order: [["createdAt", "DESC"]],
  });
};

// 가입을 희망하는 회원리스트
exports.getAdminInfo = async (userId, clubId) => {
  return await Club.findAll({
    attributes: [],
    include: [
      {
        model: User,
        as: "ApplyUser",
        attributes: ["id", "nickname", "address", "profileurl", "createdAt"],
        through: {
          attributes: [],
          where: { use: false },
        },
      },
    ],
    where: { id: clubId },
  });
};

// 운영자가 가입을 허락한다.
exports.setAdminAllow = async (userId, applyUserId, clubId) => {
  // userId 운영자 확인 로직 필요
  return await UserClub.update(
    { use: true },
    {
      where: { UserId: applyUserId, ClubId: clubId, use: false },
    }
  );
};

// 클럽 생성
exports.createClub = async (userId, title, img) => {
  const club = await Club.create({
    title,
    img,
    AdminId: userId,
  });
  return await club.addApplyUser(parseInt(userId, 10));
};
