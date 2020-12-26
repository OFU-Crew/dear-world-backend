const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Emoji = sequelize.define('emoji', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    unicode: {
      type: DataTypes.STRING(32),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    timestamps: true,
    underscored: true,
  });
  return Emoji;
};
