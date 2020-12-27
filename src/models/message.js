const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Message extends Model {
    static associate(models) {
      this.belongsTo(models.AnonymousUser, {
        foreignKey: 'anonymous_user_id',
      });
    }
  };

  Message.init({
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
      unique: true,
    },
    content: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    likeCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    tableName: 'messages',
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: true,
    underscored: true,
  });

  return Message;
};
