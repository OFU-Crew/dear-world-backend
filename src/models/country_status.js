const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class CountryStatus extends Model {
    static associate(models) {
      this.belongsTo(models.Country, {
        foreignKey: 'countryId',
      });
    }
  };

  CountryStatus.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    messageCount: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    likeCount: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    population: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
    },
  }, {
    sequelize,
    tableName: 'country_statuses',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: true,
    underscored: true,
  });

  return CountryStatus;
};
