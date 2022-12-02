const Sequelize = require("sequelize");

module.exports = class Deploy extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        use: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        Club_id: {
          type: Sequelize.INTEGER(32),
          allowNull: false,
          unique: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Deploy",
        tableName: "deploys",
        paranoid: true,
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }
};
