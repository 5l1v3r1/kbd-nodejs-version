let Sequelize = require('sequelize');
let sequelize = require('../helpers/database');

const PaidHouse = sequelize.define('paid_house', {});

module.exports = PaidHouse;