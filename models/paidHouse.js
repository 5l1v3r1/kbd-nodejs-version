let Sequelize = require('sequelize');
let sequelize = require('../helpers/database');

const PaidHouse = sequelize.define('paid_houses', {});

module.exports = PaidHouse;