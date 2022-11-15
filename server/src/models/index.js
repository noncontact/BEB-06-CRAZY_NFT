const Sequelize = require("sequelize");
const dotenv = require("dotenv").config;
if (dotenv.error) throw dotenv.error

const env = process.env.NODE_ENV || 'development';
const config = require('#src/config/config')[env];

const User = require("./user.js");
// const Post = require('./post');
// const Comment = require('./comment');  
// const CommentLike = require('./commentlike');

const db = {};

console.log("db연결 데이터확인", config);

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
User.init(sequelize);
User.associate(db);

module.exports = db;