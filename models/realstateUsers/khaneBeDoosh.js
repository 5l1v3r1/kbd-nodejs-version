let House = require('../house');

class KhaneBeDoosh {
    static addHouse(owner, body) {
        body.data.forEach(function (house) {
            House.create({
                id: house['id'],
                owner: owner,
                building_type: (house['buildingType'] === 'آپارتمان') ? 'APARTMENT' : 'VILLA',
                deal_type: (house['dealType'] === 0) ? 'BUY' : 'RENTAL',
                sell_price: (house['dealType'] === 0) ? house['price']['sellPrice'] : 0,
                base_price: (house['dealType'] === 1) ? house['price']['basePrice'] : 0,
                rent_price: (house['dealType'] === 1) ? house['price']['rentPrice'] : 0,
                area: house['area'],
                address: house['address'],
                image_URL: house['imageURL'],
            });
        });
    };

    static async getHouse(body) {
        const house = body.data;
        return House.build({
            id: house['id'],
            area: house['area'],
            building_type: (house['buildingType'] === 'آپارتمان') ? 'APARTMENT' : 'VILLA',
            deal_type: (house['dealType'] === 0) ? 'BUY' : 'RENTAL',
            sell_price: (house['dealType'] === 0) ? house['price']['sellPrice'] : 0,
            base_price: (house['dealType'] === 1) ? house['price']['basePrice'] : 0,
            rent_price: (house['dealType'] === 1) ? house['price']['rentPrice'] : 0,
            address: house['address'],
            image_URL: house['imageURL'],
            phone: house['phone'],
            description: house['description'],
        });
    }
}

module.exports = KhaneBeDoosh;

