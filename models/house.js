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

//TODO: belongsToMany
House.hasMany(PaidHouse, {
    as: 'owners',
});

House.prototype.filterPhone = async function(user)  {
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

    delete result.base_price;
    delete result.sell_price;
    delete result.rent_price;

    result.price = {};
    if (result.deal_type === 'BUY')
        result.price.sell = this.sell_price;
    else
        result.price = {
            base: this.base_price,
            rent: this.rent_price,
        };

    return result;
};

module.exports = House;