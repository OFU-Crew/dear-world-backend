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
  foreignKey: 'countryId',
});
db.AnonymousUser.belongsTo(db.Country, {
  foreignKey: 'countryId',
});
db.AnonymousUser.belongsTo(db.Emoji, {
  foreignKey: 'emojiId',
});
db.Message.belongsTo(db.AnonymousUser, {
  foreignKey: 'anonymousUserId',
});
db.LikeHistory.belongsTo(db.Message, {
  foreignKey: 'messageId',
});

module.exports = db;
