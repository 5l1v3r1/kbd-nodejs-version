let House = require('../house');

class KhaneBeDoosh {
    static addHouse(owner, body) {
        House.create({
            id: body['id'],
            owner: owner,
            building_type: (body['buildingType'] === 'آپارتمان') ? 'APARTMENT' : 'VILLA',
            deal_type: (body['dealType'] === 0) ? 'BUY' : 'RENTAL',
            sell_price: (body['dealType'] === 0) ? body['price']['sellPrice'] : 0,
            base_price: (body['dealType'] === 1) ? body['price']['basePrice'] : 0,
            rent_price: (body['dealType'] === 1) ? body['price']['rentPrice'] : 0,
            area: body['area'],
            address: body['address'],
            image_URL: body['imageURL'],
        });
    };
}

module.exports = KhaneBeDoosh;

