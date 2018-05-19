let express = require('express');
let router = express.Router();
let validate = require('express-validation');
let Sequelize = require('sequelize');
const Op = Sequelize.Op;


let jsonResponse = require("../../../helpers/jsonResponse");
let rules = require('../../../validations');
let House = require('../../../models/house');

router.get("/", validate(rules.house.filter), async (req, res) => {
    let area = 0;
    if (req.query["minimum-area"])
        area = req.query["minimum-area"];

    let price = null;
    if (req.query["maximum-price"])
        price = req.query["maximum-price"];

    let dealType = (req.query["deal-type"] === '0') ? "BUY" : "RENTAL";
    let buildingType = (req.query["building-type"] === '0') ? "VILLA" : "APARTMENT";

    let config = {
        where: {
            area: {[Op.gte]: area},
            deal_type: dealType,
            building_type: buildingType,
        }
    };
    if (price !== null){
        if (dealType === "BUY")
            config.where.sell_price = {[Op.lte]: price};
        else
            config.where.base_price = {[Op.lte]: price};
    }

    let houses = await House.findAll(config);
    res.json(jsonResponse.successData(houses));
});

module.exports = router;