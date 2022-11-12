const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
require("better-module-alias")(__dirname);
const { sequelize } = require("@src/models/index.js");
// const routes require "./src/routes/index.js";
// const { swaggerUi, specs } require './src/swagger/swagger.js';

app.set("port", process.env.PORT || 4000);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:4000",
  methods: "POST,PUT,DELETE,GET",
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

// sequelize
//   .sync({ alter: false }) // force:true 일경우 테이블 전부 지우고 새로 설정~!  alter
//   .then(() => {
//     console.log("데이터베이스 연결 성공");
//   })
//   .catch((err) => {
//     console.error(err);
//   });

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(400).send("Something broke!");
});

app.use((req, res, next) => {
  return res.status(404).send("invalid path");
});

app.listen(app.get("port"), () => {
  console.log(`✅ Server running on http://localhost:${app.get("port")}`);
});

module.exports = app;
