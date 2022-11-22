const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        nickname: {
          type: Sequelize.STRING(15),
          allowNull: false,
          unique: true,
          validate: {
            notNull: { msg: "User must have a name" },
            notEmpty: { msg: "Name must not be empty" },
          },
        },
        password: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        profileurl: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "users",
        paranoid: true, // 실제 삭제하지 않고 deleteAt 만들기
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: "UserId" });
    db.User.hasMany(db.Comment, { foreignKey: "Commenter", sourceKey: "id" });
    db.User.hasMany(db.NFT, { foreignKey: "UserId" });
    // 클럽과 유저
    db.User.belongsToMany(db.Club, {
      foreignKey: "ClubId",
      as: "ApplyClub",
      through: db.UserClub,
    });
    db.User.belongsToMany(db.Auth, {
      foreignKey: "AuthId",
      as: "Auth", //함수불러올때 이름을 정의해주는것
      through: "AuthorizationUsers", //중간테이블
    });
    db.User.belongsToMany(db.Post, {
      foreignKey: "PostId",
      as: "LikePost",
      through: "PostLike",
    });
    //db.User.hasMany(db.PostLike, { foreignKey: "LikeUserId", sourceKey: "id" });
  }
};
