const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Emoji = sequelize.define('LikeHistory', {
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
    image_url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    unicode: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
  });
  return Emoji;
};