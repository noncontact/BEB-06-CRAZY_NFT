const Sequelize = require("sequelize");

module.exports = class NFT extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        metaCid: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        contractAddress: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        // 최대 발행량
        deployCount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "NFT",
        tableName: "nft",
        paranoid: false,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  static associate(db) {
    db.NFT.belongsTo(db.Club, { foreignKey: "ClubId" });
    db.NFT.hasMany(db.NFTUser, { foreignKey: "NFTId" });
    db.NFT.belongsToMany(db.Auth, {
      foreignKey: "NFTId",
      as: "Auth",
      through: "AuthorizationNFTs", //중간테이블
    });
  }
};
