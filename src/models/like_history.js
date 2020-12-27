const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class LikeHistory extends Model {
    static associate(models) {
      this.belongsTo(models.Message, {
        foreignKey: 'message_id',
      });
    }
  };

  LikeHistory.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    ipv4: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'like_historyies',
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
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
