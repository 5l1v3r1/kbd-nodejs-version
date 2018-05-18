let Sequelize = require('sequelize');
let sequelize = require('../helpers/database');

const PaidHouse = sequelize.define('paid_house', {
    id: { type: Sequelize.UUIDV4, primaryKey: true },
    house_id: Sequelize.INTEGER,
    house_owner: Sequelize.INTEGER,
});

module.exports = PaidHouse;