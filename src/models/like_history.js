const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const LikeHistory = sequelize.define('LikeHistory', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ipv4: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });
  return LikeHistory;
};
