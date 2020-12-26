const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const AnonymousUser = sequelize.define('AnonymousUser', {
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
  });
  return AnonymousUser;
};
