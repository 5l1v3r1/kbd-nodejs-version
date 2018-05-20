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

House.prototype.filterPhone = async (user) => {
    let paidHouses = await PaidHouse.findAll({
        where: {
            individualUserId: user.id,
            houseId: this.id
        }
    });
    let result = this.toJSON();
    if (paidHouses.length === 0) {
        result.phone = this.phone.substr(0, 4) + '****' + this.phone.slice(-2);
        result.hasBoughtPhone = false;
    } else {
        result.hasBoughtPhone = true;
    }
    return result;
};

module.exports = House;