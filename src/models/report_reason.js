const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class ReportReason extends Model {
    static associate(models) {
      // Empty
    }
  };

  ReportReason.init({
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
  }, {
    sequelize,
    tableName: 'report_reasons',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: true,
    underscored: true,
  });

  return ReportReason;
};