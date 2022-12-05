const Sequelize = require("sequelize");

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        img: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.belongsTo(db.User, {
      foreignKey: "UserId",
    });
    db.Post.belongsTo(db.Forum, {
      foreignKey: "ForumId",
    });
    db.Post.belongsTo(db.Club, {
      foreignKey: "ClubId",
    });
    db.Post.hasMany(db.Comment, { foreignKey: "PostId", sourceKey: "id" });
    db.Post.belongsToMany(db.User, {
      foreignKey: "PostId",
      as: "LikeUser",
      through: "PostLike",
    });
    //db.Post.hasMany(db.PostLike, { foreignKey: "LikePostId", sourceKey: "id" });
  }
};
