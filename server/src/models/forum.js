const Sequelize = require("sequelize");

module.exports = class Forum extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
        },
        depth: {
          // 0: 카테고리, 1: 게시판 , 2: 자식 게시판
          type: Sequelize.INTEGER(32),
          allowNull: false,
        },
        parent: {
          //최상위 일경우 자기자신의 id 값을 넣는다
          type: Sequelize.DataTypes.INTEGER(11),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Forum",
        tableName: "forums",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Forum.hasMany(db.Post, { foreignKey: "ForumId" });
    db.Forum.belongsTo(db.Club, { foreignKey: "ClubId", targetKey: "id" });
    db.Forum.belongsToMany(db.Auth, {
      foreignKey: "AuthId",
      as: "Auth", //함수불러올때 이름을 정의해주는것
      through: db.AuthForum, //중간테이블
    });
  }
};
