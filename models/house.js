let Sequelize = require('sequelize');
let sequelize = require('../helpers/database');
let PaidHouse = require('./paidHouse');

const House = sequelize.define('house', {
    id: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    owner: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    building_type: Sequelize.ENUM('APARTMENT', 'VILLA'),
    deal_type: Sequelize.ENUM('BUY', 'RENTAL'),
    base_price: Sequelize.INTEGER,
    rent_price: Sequelize.INTEGER,
    sell_price: Sequelize.INTEGER,
    area: Sequelize.INTEGER,
    address: Sequelize.STRING,
    image_URL: Sequelize.STRING,
    phone: Sequelize.STRING,
    description: Sequelize.TEXT
});

House.hasMany(PaidHouse, {
    as: 'owners',
});

module.exports = House;