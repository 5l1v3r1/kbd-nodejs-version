let Sequelize = require('sequelize');
let sequelize = require('../helpers/database');

const IndividualUser = sequelize.define('individual_user', {
    id: { type: Sequelize.UUIDV4, primaryKey: true },
    name: Sequelize.STRING,
    phone: Sequelize.STRING,
    balance: Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = IndividualUser;