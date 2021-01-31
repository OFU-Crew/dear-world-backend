const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Report extends Model {
    static associate(models) {
      this.hasOne(models.User, {
        foreignKey: 'anonymousUserId',
        as: 'suspect',
      });

      this.hasOne(models.User, {
        foreignKey: 'anonymousUserId',
        as: 'reporter',
      });

      this.hasOne(models.User, {
        foreignKey: 'reportReasonId',
        as: 'report_reason',
      });
    }
  };

  Report.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    category: {
      type: DataTypes.ENUM([
        'MESSAGE',
      ]),
      allowNull: false,
      defaultValue: 'MESSAGE',
    },
    isPassed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isProcessed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    tableName: 'reports',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: true,
    underscored: true,
  });

  return Report;
};
