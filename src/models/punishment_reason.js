const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class PunishmentReason extends Model {
    static associate(models) {
      // Empty
    }
  };

  PunishmentReason.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    punishment_day: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  }, {
    sequelize,
    tableName: 'punishment_reasons',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: true,
    underscored: true,
  });

  return PunishmentReason;
};
