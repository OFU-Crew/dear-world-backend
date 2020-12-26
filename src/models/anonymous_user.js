const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const AnonymousUser = sequelize.define('anonymous_user', {
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
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
  });
  return AnonymousUser;
};
