const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class LikeHistory extends Model {
    static associate(models) {
      this.belongsTo(models.Message, {
        foreignKey: 'messageId',
        as: 'message',
      });
    }
  };

  LikeHistory.init({
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ipv4: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    like: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    tableName: 'like_histories',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['ipv4'],
      },
    ],
  });

  return LikeHistory;
};
