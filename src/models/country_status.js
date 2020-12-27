const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class CountryStatus extends Model {
    static associate(models) {
      // Empty
    }
  };

  CountryStatus.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    messageCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    likeCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    population: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'country_statuses',
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: true,
    underscored: true,
  });

  return CountryStatus;
};
