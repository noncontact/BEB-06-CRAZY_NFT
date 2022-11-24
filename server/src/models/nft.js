const Sequelize = require("sequelize");

module.exports = class NFT extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        metaCid: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
        contractAddress: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
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
    db.NFT.belongsTo(db.User, {
      foreignKey: "AdminAddress",
      
    }); // 운영자 아이디
    db.NFT.belongsTo(db.Club, { foreignKey: "ClubId" });
    db.NFT.hasMany(db.NFTUser, { foreignKey: "NFTId" });
    db.NFT.belongsToMany(db.Auth, {
      foreignKey: "NFTId",
      as: "Auth",
      through: "AuthorizationNFTs", //중간테이블
    });
  }
};
