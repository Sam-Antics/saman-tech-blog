// import the Sequelize constructor
const Sequelize = require('sequelize');
// environment variable package requirement
require('dotenv').config();

// connection logic updated for the use of JawsDB on the heroku-deployed app
let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
// create connection to our database, pass in your MySQL information for username and password
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});
}



module.exports = sequelize;