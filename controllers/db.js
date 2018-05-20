let House = require('../models/house');
let PaidHouse = require('../models/paidHouse');
let IndividualUser = require('../models/individualUser');
let RealstateUser = require('../models/realstateUser');
let config = require('../helpers/config');
let uniqid = require('uniqid');

let express = require('express');
let router = express.Router();

router.get('/create-tables', (req, res) => {
    House.sync();
    PaidHouse.sync();
    IndividualUser.sync();
    RealstateUser.sync();
    res.send("created!");
});

router.get('/seed', async (req, res) => {
    IndividualUser.create({
        name: "بهنام همایون",
        phone: "09123019702",
        balance: 1000,
        username: "admin",
        password: "123"
    });

    RealstateUser.create({name: "system"});
    RealstateUser.create({name: "khane-be-doosh",api_address: "http://139.59.151.5:6664/khaneBeDoosh/v2"});

    const system = await RealstateUser.find({where: {name: "system"}});

    House.create({
        id: uniqid(),
        owner: system.id,
        building_type: 'APARTMENT',
        deal_type: 'BUY',
        sell_price: 1000,
        area: 200,
        address: "نیروهوایی",
        image_URL: config.NO_IMAGE_PATH,
        phone: "09123019701",
        description: "simple"
    });
    House.create({
        id: uniqid(),
        owner: system.id,
        building_type: 'APARTMENT',
        deal_type: 'BUY',
        sell_price: 2000,
        area: 100,
        address: "پیروزی",
        image_URL: config.NO_IMAGE_PATH,
        phone: "09123019702",
        description: "so simple"
    });
    House.create({
        id: uniqid(),
        owner: system.id,
        building_type: 'VILLA',
        deal_type: 'BUY',
        sell_price: 10000,
        area: 500,
        address: "شمرون",
        image_URL: config.NO_IMAGE_PATH,
        phone: "09123019702",
        description: "awesome"
    });
    House.create({
        id: uniqid(),
        owner: system.id,
        building_type: 'VILLA',
        deal_type: 'RENTAL',
        base_price: 200,
        sell_price: 20000,
        area: 400,
        address: "شمرون",
        image_URL: config.NO_IMAGE_PATH,
        phone: "09123019705",
        description: "awesome but not for you"
    });

    res.send("seeded");
});

module.exports = router;
