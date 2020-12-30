const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Country extends Model {
    static associate(models) {
      this.hasOne(models.CountryStatus, {
        foreignKey: 'countryId',
        as: 'countryStatus',
      });
    }
  };

  Country.init({
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(3),
      allowNull: false,
      unique: true,
    },
    fullName: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    emojiUnicode: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    tableName: 'countries',
    charset: 'utf8mb4',
    collate: 'utf8mb4_bin',
    timestamps: true,
    underscored: true,
  });

  return Country;
};
