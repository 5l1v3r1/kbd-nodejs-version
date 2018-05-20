const Sequelize = require('sequelize');

module.exports = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    storage: 'database.sqlite'
});