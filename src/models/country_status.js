const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const CountryStatus = sequelize.define('country_status', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    messageCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    population: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: true,
    underscored: true,
  });
  return CountryStatus;
};
