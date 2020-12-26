const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const Message = sequelize.define('message', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    content: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Message;
};
