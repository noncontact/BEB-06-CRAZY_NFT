const { User, Club } = require("#src/models/index.js");
const { return_function, return_err } = require("#src/process/error.process.js");
// 유저 Id 가져오기
exports.getUserId = async (address) => {
  try {
    const result = await User.findOne({
      attributes: ["id"],
      where: { address },
    });
    return return_function(result, true)
  }
  catch (err) {
    return return_err(err)
  }
};

// 유저 정보 가져오기
exports.getUser = async (address, password) => {
  try {
    const result = await User.findOne({
      attributes: ["id", "nickname", "profileurl", "address", "createdAt"],
      where: { address, password },
    });
    return return_function(result)
  }
  catch (err) {
    return return_err(err)
  }
};

// 나의 정보 가져오기
exports.getMyDetail = async (userId) => {
  try{
    const result = await User.findOne({
      attributes: ["id", "nickname", "profileurl", "address", "createdAt"],
      where: { id: userId },
    });
    return return_function(result)
  }
  catch (err) {
    return return_err(err)
  }
};

// 유저 생성하기
exports.createUser = async (address, password, nickname, profileurl) => {
  try {
    await User.create({
      address,
      password,
      nickname,
      profileurl,
    });
    return return_function("insert")
  }
  catch (err) {
    console.log("err = ", err)
    return return_err(err)
  }
};

// 나의 가입 Club 목록
exports.getMyClubs = async (userId) => {
  try {
    const result = await User.findAll({
      include: [
        {
          model: Club,
          as: "ApplyClub",
          attributes: ["id", "title", "img"],
          through: {
            attributes: ["createdAt"],
            where: { use: true },
          },
        },
      ],
      attributes: [],
      where: { id: userId },
    });
    return return_function(result, false)
  }
  catch (err) {
    return return_err(err)
  }
};

// 클럽 가입신청
exports.setUserClub = async (userId, clubId) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
    });

    if (user !== null) {
      await user.addApplyClub(parseInt(clubId, 10));
      return_function("insert")
    }
    return return_function(user)
  }
  catch (err) {
    return return_err(err)
  }
};
