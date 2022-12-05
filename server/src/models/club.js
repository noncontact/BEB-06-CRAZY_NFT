const Sequelize = require("sequelize");

module.exports = class Club extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
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
        modelName: "Club",
        tableName: "clubs",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    // 클럽 개설 운영자 id
    db.Club.belongsTo(db.User, { foreignKey: "AdminId" });
    // 클럽과 유저
    db.Club.belongsToMany(db.User, {
      foreignKey: "ClubId",
      as: "ApplyUser",
      through: db.UserClub,
    });
    db.Club.hasMany(db.Forum, { foreignKey: "ClubId", targetKey: "id" });
    db.Club.hasMany(db.NFT, { foreignKey: "ClubId", targetKey: "id" });
  }
};
