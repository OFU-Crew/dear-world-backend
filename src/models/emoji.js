const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Emoji extends Model {
    static associate(models) {
      // Empty
    }
  };

  Emoji.init({
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
      unique: true,
    },
  }, {
    sequelize,
    tableName: 'emojis',
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: true,
    underscored: true,
  });

  return Emoji;
};
