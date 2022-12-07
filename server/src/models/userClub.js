const Sequelize = require("sequelize");

module.exports = class UserClub extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        use: {
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "UserClub",
        tableName: "UserClubs",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
