const Sequelize = require("sequelize");

module.exports = class Auth extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          // 권한 등급명 (운영자, 레어, 커먼, 언커먼)
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Auth",
        tableName: "auth",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Auth.belongsToMany(db.Forum, {
      foreignKey: "ForumId",
      as: "Forum", //함수불러올때 이름을 정의해주는것
      through: db.AuthForum, //중간테이블
    });
    db.Auth.belongsToMany(db.User, {
      foreignKey: "UserId",
      as: "User", //함수불러올때 이름을 정의해주는것
      through: "AuthorizationUsers", //중간테이블
    });
    db.Auth.belongsToMany(db.NFT, {
      foreignKey: "NFTId",
      as: "NFT", //함수불러올때 이름을 정의해주는것
      through: "AuthorizationNFTs", //중간테이블
    });
  }
};
