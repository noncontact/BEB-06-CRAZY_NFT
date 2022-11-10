const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

const development = {
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE,
  host: "localhost",
  dialect: "postgres",
  port: env.POSTGRES_PORT,
  timezone: "+09:00",
};

const production = {
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE,
  host: env.POSTGRES_HOST,
  dialect: "postgres",
  timezone: "+09:00",
};

const test = {
  username: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DATABASE_TEST,
  host: "localhost",
  dialect: "postgres",
  timezone: "+09:00",
};

module.exports = { development, production, test };
