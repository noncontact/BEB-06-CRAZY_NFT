
//const jwt = require("jsonwebtoken");
const { user } = require("#src/services/index"); 
const contract = require("#src/process/contract.process");

// ✅ user 로그인 /signIn
exports.post_signin = async (req, res, next) => {
  const { address, password } = req.body;
  console.log("userLogin", address, password);
  if (!(address && password))
    return res.status(404).json("fail error = 입력정보가 부족합니다");
  try {
    const userData = await user.getUser(address, password);
    if(userData.msg === "success") {
      console.log("로그인 성공");
      return res.status(200).json({
        data: userData.value
      });
    } else {
      console.log("로그인 실패");
      return res.status(404).json({
        data: "fail error = 아이디 또는 비밀번호가 잘못되었습니다.",
      });
    }
  } catch (err) {
    console.log("로그인 실패");
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ user 회원 가입 /signup
exports.post_signup = async function (req, res, next) {
  const { address, password, nickname, profileurl } = req.body;
  console.log("signup 데이터 체크", address, password, nickname, profileurl);

  if (!(profileurl && password && nickname && address))
    return res.status(404).json({
      data: "fail error = 입력정보 부족",
    });

  try {

    const result_user = await user.getUserId(address);
    if(result_user.msg === "success"){
      return res.status(404).json({
        data: `fail error = 이미 가입한 사용자 계정입니다.`,
      });
    }

    let result = await user.createUser(address, password, nickname, profileurl);
    console.log(result);
    if(result.msg === "success") {
      result = await contract.sendTransfer (address);
      return res.status(200).json({
        data: "success",
      });
    }

    console.log(result.value);
    return res.status(404).json({
      data: `fail error = ${result.value}`,
    });

  } catch (err) {
    console.log("err ", err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};


