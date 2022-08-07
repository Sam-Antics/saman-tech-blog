// import the Sequelize constructor
const Sequelize = require('sequelize');
// environment variable package requirement
require('dotenv').config();

//connection to database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});