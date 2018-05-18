let Sequelize = require('sequelize');
let sequelize = require('../helpers/database');

const RealstateUser = sequelize.define('realstate_users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    api_address: Sequelize.STRING
});

module.exports = RealstateUser;