const { Club } = require("#src/models/index.js");

// 모든 클럽정보 가져오기
exports.getAllClub = async () => {
  return await Club.findAll({
    order: [["createdAt", "DESC"]],
  });
};

// 가입을 희망하는 회원리스트
exports.getAdminInfo = async (clubId) => {
  return await Club.findAll({
    attribute: [UserId],
    where: { id: clubId, use: false },
  });
};

// 운영자가 가입을 허락한다.
exports.setAdminAllow = async (userId, applyUserId, clubId) => {
  // userId 운영자 확인 로직 필요
  return await Club.update({
    use: true,
    where: { ClubId: clubId, UserId: applyUserId, use: false },
  });
};
