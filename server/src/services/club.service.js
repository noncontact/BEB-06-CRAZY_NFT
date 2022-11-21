const { db } = require("#src/models/index.js");
const { Club } = db;

// 모든 클럽정보 가져오기
exports.getAllClub = async () => {
  return await Club.findAll({
    order: [["createdAt", "DESC"]],
  });
};
