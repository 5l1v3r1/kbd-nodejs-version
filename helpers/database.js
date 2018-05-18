const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', null, null, {
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

module.exports = sequelize;