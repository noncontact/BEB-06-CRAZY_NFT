const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv").config(); 
require("better-module-alias")(__dirname);
const { sequelize } = require("#src/models");
// const routes require "@@routes/index.js";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("#server/swaggerhub/swaggerhub.json");

app.set("port", process.env.PORT || 3005);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:3000",
  methods: "POST,GET",
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));

sequelize
  .sync({ alter: true }) // force:true 일경우 테이블 전부 지우고 새로 설정~!  alter
  .then(() => {
    console.log("데이터베이스 연결 성공");
    console.log(`✅ Server running on http://localhost:${app.get('port')}/index`);
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/index", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//app.use("/", routes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(400).send("Something broke!");
});

app.use((req, res, next) => {
  return res.status(404).send("invalid path");
});

app.listen(app.get('port'), () => {
  //console.log(`✅ Server running on http://localhost:${app.get('port')}/index`);
});

module.exports = app;
