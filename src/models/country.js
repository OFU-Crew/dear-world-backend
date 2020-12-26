const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Country = sequelize.define('Country', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(3),
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    emoji_unicode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  });
  return Country;
};
