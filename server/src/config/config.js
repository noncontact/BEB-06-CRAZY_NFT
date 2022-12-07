
const env = process.env;

const development = {
  username: env.MYSQL_USERNAME || "root",
  password: env.MYSQL_PASSWORD || "1234",
  database: env.MYSQL_DATABASE || "crazynft",
  host: env.MYSQL_HOST || "localhost", 
  port: env.MYSQL_PORT || "3306",
  dialect: "mysql",
  dialectOptions: { charset: "utf8mb4", dateStrings: true, typeCast: true }, // 날짜의 경우 문자열로 타입 변경 처리

  timezone: "+09:00",
  // dialectOptions: {
  //   options: {
  //     requestTimout: 3000
  //   }
  // }
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  timezone: "+09:00",
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: "localhost",
  dialect: "mysql",
  timezone: "+09:00",
};

module.exports = { development, production, test };
