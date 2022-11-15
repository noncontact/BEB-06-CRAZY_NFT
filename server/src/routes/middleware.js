const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isLoggedIn = (req, res, next) => {
  try {
    if (!req.cookies.loginData) {
      return res.status(401).json({
        status: false,
        message: "로그인이 필요합니다.",
      });
    } else {
      req.cookies.loginData = jwt.verify(
        req.cookies.loginData,
        process.env.ACCESS_SECRET
      );
      next();
    }
  } catch (err) {
    const message = "";
    res.json(`error=${message} ${err}`);
  }
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.cookies.loginData) {
    next();
  } else {
    const message = "로그인한 상태입니다.";
    res.json(`error=${message}`);
  }
};

module.exports = { isLoggedIn, isNotLoggedIn };
