let Sequelize = require('sequelize');
let sequelize = require('../helpers/database');
let PaidHouse = require('./paidHouse');

const IndividualUser = sequelize.define('individual_users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    balance: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

IndividualUser.hasMany(PaidHouse, {
    as: 'paidHouses',
});

module.exports = IndividualUser;