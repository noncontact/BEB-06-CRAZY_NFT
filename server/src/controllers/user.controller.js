//const jwt = require("jsonwebtoken");
const service = require("../services/user.service");

//user 로그인 /signIn
exports.post_signin = async (req, res, next) => {
  const { address, password } = req.body;
  console.log(address, password);
  if (!(address && password))
    return res.status(404).json("입력정보가 부족합니다");
  try {
    // 로그인 처리 함수 구현 필요
    const userData = await service.getUserData(address, password);
    ///////////////test code/////////////
    let rtn_obj = new Object();
    rtn_obj.nickname = "kkkk";
    rtn_obj.imageURI = "IPFS://jbfjrejbjervberruew43jb4j25";
    console.log(rtn_obj);
    /////////////////////////////////////
    if (rtn_obj === "error") {
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

// user 회원 가입 /signup
exports.post_signup = async function (req, res, next) {
  const { address, password, nickname, profileurl } = req.body;
  console.log("signup 데이터 체크", profileurl, password, nickname, address);

  if (!(profileurl && password && nickname && address))
    return res.status(404).json({
      data: "입력정보 부족",
    });

  try {
    // 회원가입 처리 함수 구현 필요
    const makeUser = await service.createUser(
      profileurl,
      password,
      nickname,
      address
    );

    return res.status(200).json({
      data: "success",
    });
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};
