let Sequelize = require('sequelize');
let sequelize = require('../helpers/database');

const RealstateUser = sequelize.define('realstate_user', {
    id: { type: Sequelize.UUIDV4, primaryKey: true },
    name: Sequelize.STRING,
    api_address: Sequelize.STRING
});

module.exports = RealstateUser;