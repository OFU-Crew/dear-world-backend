const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const {Sequelize} = require('sequelize');
const config = require('../configs/mysql_config');
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
    },
);
const db = {
  sequelize,
  Sequelize,
};

fs
    .readdirSync(__dirname)
    .filter((file) => {
      return (file.indexOf('.') !== 0) &&
          (file !== basename) &&
          (file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
          sequelize,
      );
      db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
