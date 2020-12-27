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
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    messageCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    likeCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
    },
    population: {
      type: DataTypes.BIGINT,
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
