const { db } = require("#src/models/index.js");
const { User } = db;

// 유저 정보 가져오기
exports.getUser = async (address, password) => {
  return await User.findOne({
    attributes: ['id', "nickname", "profileurl","address" ,"createdAt"],
    where: { address, password },
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
