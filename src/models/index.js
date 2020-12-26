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

db.Country = require('./country')(sequelize);
db.CountryStatus = require('./country_status')(sequelize);
db.AnonymousUser = require('./anonymous_user')(sequelize);
db.Message = require('./message')(sequelize);
db.LikeHistory = require('./like_history')(sequelize);
db.Emoji = require('./emoji')(sequelize);

// Associations
db.Country.hasOne(db.CountryStatus, {
  foreignKey: 'country_id',
});
db.AnonymousUser.belongsTo(db.Country, {
  foreignKey: 'country_id',
});
db.AnonymousUser.belongsTo(db.Emoji, {
  foreignKey: 'emoji_id',
});
db.Message.belongsTo(db.AnonymousUser, {
  foreignKey: 'anonymous_user_id',
});
db.LikeHistory.belongsTo(db.Message, {
  foreignKey: 'message_id',
});

module.exports = db;
