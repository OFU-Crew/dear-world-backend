const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Country = sequelize.define('country', {
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
    fullName: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    emojiUnicode: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true,
    underscored: true,
  });
  return Country;
};
