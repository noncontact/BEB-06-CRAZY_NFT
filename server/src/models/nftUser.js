const Sequelize = require("sequelize");

module.exports = class NFTUser extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        address: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        token_id: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "NFTUser",
        tableName: "nftuser",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.NFTUser.belongsTo(db.User, { foreignKey: "UserId" });  // 운영자 아이디
    db.NFTUser.belongsTo(db.NFT, { foreignKey: "NFTId" });
  }
};
