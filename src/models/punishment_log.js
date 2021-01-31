const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class PunishmentLog extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'anonymousUserId',
        as: 'user',
      });
    }
  };

  PunishmentLog.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
  }, {
    sequelize,
    tableName: 'punishment_logs',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: true,
    underscored: true,
  });

  return PunishmentLog;
};
