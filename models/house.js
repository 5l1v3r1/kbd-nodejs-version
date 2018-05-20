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

House.filterPhone = async function(house, user)  {
    let result = {
        id: house.id,
        owner: (house.owner === 1) ? "system" : "khane-be-doosh",
        imgURL: house.image_URL,
        area: house.area,
        buildingType: house.building_type,
        dealType: house.deal_type,
        address: house.address,
        description: house.description,
    };

    if (house.phone) {
        let paidHouses = await PaidHouse.findAll({
            where: {
                individualUserId: user.id,
                houseId: house.id
            }
        });
        if (paidHouses.length === 0) {
            result.phone = house.phone.substr(0, 3) + '****' + house.phone.slice(-2);
            result.hasBoughtPhone = false;
        } else {
            result.phone = house.phone;
            result.hasBoughtPhone = true;
        }
    }

    result.price = {};
    if (house.deal_type === 'BUY')
        result.price.sell = house.sell_price;
    else
        result.price = {
            base: house.base_price,
            rent: house.rent_price,
        };

    return result;
};

House.deleteAllByOwner = async function(ownerID) {
    await House.destroy({
        where: {
            owner: ownerID
        }
    });
};

module.exports = House;