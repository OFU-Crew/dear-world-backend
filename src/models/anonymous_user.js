const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class AnonymousUser extends Model {
    static associate(models) {
      this.belongsTo(models.Country, {
        foreignKey: 'countryId',
        as: 'country',
      });

      this.belongsTo(models.Emoji, {
        foreignKey: 'emojiId',
        as: 'emoji',
      });

      this.hasOne(models.Message, {
        foreignKey: 'anonymousUserId',
        as: 'message',
      });
    }
  }

  AnonymousUser.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'anonymous_users',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['nickname'],
      },
    ],
  });

  return AnonymousUser;
};
