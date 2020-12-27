const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Emoji extends Model {
    static associate(models) {
      // Empty
    }
  };

  Emoji.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    unicode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    tableName: 'emojis',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: true,
    underscored: true,
  });

  return Emoji;
};
