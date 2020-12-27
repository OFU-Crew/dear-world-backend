const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.AnonymousUser, {
        foreignKey: 'anonymousUserId',
      });
    }
  };

  Message.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    tableName: 'messages',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: true,
    underscored: true,
  });

  return Message;
};
