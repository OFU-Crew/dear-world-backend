const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const CountryStatus = sequelize.define('CountryStatus', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    message_count: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    like_count: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    population: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
  });
  return CountryStatus;
};
