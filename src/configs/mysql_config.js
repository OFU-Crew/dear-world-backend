module.exports = {
  database: process.env.MYSQL_DATABASE || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  dialect: process.env.MYSQL_DIALECT || 'mysql',
  connectTimeout: Number(process.env.MYSQL_CONNECT_TIMEOUT || 1000),
};
