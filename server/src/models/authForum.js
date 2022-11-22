const Sequelize = require("sequelize");

module.exports = class AuthForum extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        use: {
          // 권한 사용여부
          type: Sequelize.DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "AuthForum",
        tableName: "AuthorizationForums",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {}
};
