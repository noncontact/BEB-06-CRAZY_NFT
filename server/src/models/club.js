const Sequelize = require("sequelize");

module.exports = class Club extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(100),
          allowNull: false,
          unique: true,
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
    db.Club.hasMany(db.User, { foreignKey: "ClubId", targetKey: "id" });
    db.Club.hasMany(db.Forum, { foreignKey: "ClubId", targetKey: "id" });
    db.Club.hasMany(db.NFT, { foreignKey: "ClubId", targetKey: "id" });
  }
};
