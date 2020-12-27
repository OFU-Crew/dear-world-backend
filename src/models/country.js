const {Model, DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  class Country extends Model {
    static associate(models) {
      this.hasOne(models.CountryStatus, {
        foreignKey: 'country_id',
      });
    }
  };

  Country.init({
    id: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    tableName: 'countries',
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    timestamps: true,
    underscored: true,
  });

  return Country;
};
