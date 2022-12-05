const Sequelize = require("sequelize");

module.exports = class TranHash extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        tx_hash: {
          type: Sequelize.STRING(255),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "TranHash",
        tableName: "tranHash",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.TranHash.belongsTo(db.User, { foreignKey: "UserId" });
  }
};
