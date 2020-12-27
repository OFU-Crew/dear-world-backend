const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class AnonymousUser extends Model {
    static associate(models) {
      this.belongsTo(models.Country, {
        foreignKey: 'country_id',
      });

      this.belongsTo(models.Emoji, {
        foreignKey: 'emoji_id',
      });
    }
  }

  AnonymousUser.init({
    id: {
      type: DataTypes.BIGINT,
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
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
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
