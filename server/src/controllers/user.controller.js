//const jwt = require("jsonwebtoken");
const {
  getUserId,
  getUser,
  createUser,
  setUserClub,
} = require("#src/services/user.service");

// ✅ user 로그인 /signIn
exports.post_signin = async (req, res, next) => {
  const { address, password } = req.body;
  console.log("userLogin", address, password);
  if (!(address && password))
    return res.status(404).json("입력정보가 부족합니다");
  try {
    const userData = await getUser(address, password);

    if (userData) {
      console.log("로그인 성공");
      return res.status(200).json({
        data: userData,
      });
    } else {
      console.log("로그인 실패");
      return res.status(404).json({
        data: "아이디 또는 비밀번호가 잘못되었습니다.",
      });
    }
  } catch (err) {
    console.log("로그인 실패");
    return res.status(404).json({
      data: "fail",
    });
  }
};

// ✅ user 회원 가입 /signup
exports.post_signup = async function (req, res, next) {
  const { address, password, nickname, profileurl } = req.body;
  console.log("signup 데이터 체크", address, password, nickname, profileurl);

  if (!(profileurl && password && nickname && address))
    return res.status(404).json({
      data: "입력정보 부족",
    });

  try {
    await createUser(address, password, nickname, profileurl);

    return res.status(200).json({
      data: "success",
    });
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};

// ✅ 클럽 가입신청
exports.post_apply = async function (req, res, next) {
  try {
    const { address, club_id } = req.params;
    if (!address)
      return res.status(404).json({ data: "입력정보가 부족합니다" });

    const { id } = await getUserId(address);
    if (!id) return res.status(404).json({ data: "없는 유저입니다." });

    await setUserClub(id, club_id);
    console.log("MyPage나의 정보조회", id, club_id);
    return res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      data: "fail",
    });
  }
};
