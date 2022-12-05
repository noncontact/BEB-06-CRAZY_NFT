const { User, Club, UserClub } = require("#src/models/index.js");
const { return_function, return_err } = require("#src/process/error.process.js");

// 모든 클럽정보 가져오기
exports.getAllClub = async () => {
  try {
    const result = await Club.findAll({
      attributes: ["id", "title", "img", "createdAt", "AdminId"],
      order: [["createdAt", "DESC"]],
    });
    return return_function(result, false);
  }
  catch (err) {
    return return_err(err);
  }
};

exports.getClub = async (user_id, title) => {
  try {
    const result = await Club.findAll({
      attributes: ["id", "title"],
      where: { AdminId : user_id , title},
    });
    console.log(result);
    return return_function(result, false);
  }  
  catch (err) {
    return return_err(err);
  }
}

exports.getClubUser = async (user_id, Club_Id) => {
  try {
    const result = await UserClub.findOne({
      attributes: ["use"],
      where: { UserId : user_id , ClubId : Club_Id},
    });
    console.log(result);
    return return_function(result);
  }  
  catch (err) {
    return return_err(err);
  }
}

// 가입을 희망하는 회원리스트
exports.getAdminInfo = async (userId, clubId) => {
  try {
    const result = await Club.findAll({
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
    return return_function(result, false);
  } 
  catch (err) {
    return return_err(err);
  }
};

// 운영자가 가입을 허락한다.
exports.setAdminAllow = async (applyUserId, clubId) => {
  // userId 운영자 확인 로직 필요
  try {
    const result = await UserClub.update(
      { use: true },
      {
        where: { UserId: applyUserId, ClubId: clubId, use: false },
      }
    );
    return return_function(result);
  }
  catch (err) {
    return return_err(err);
  }
};

// 클럽 생성
exports.createClub = async (userId, title, img) => {
  try {
    const club = await Club.create({
      title,
      img,
      AdminId: userId,
    });

    await club.addApplyUser(parseInt(userId, 10));

    await User.update(
      { auth: 1 },
      {
        where: { id: userId },
      }
    );

    return return_function("insert");
  }
  catch (err) {
    return return_err(err);
  }
};

// 운영자가 개설한 클럽 리스트
exports.getAdminAllClub = async (userId) => {
  try {
    const result = await Club.findAll({
      attributes: ["id", "title", "img", "createdAt"],
      where: { AdminId: userId },
    });
    return return_function(result, false);
  } 
  catch (err) {
    return return_err(err);
  }
};