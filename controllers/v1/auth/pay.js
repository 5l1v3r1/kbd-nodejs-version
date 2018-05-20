let express = require('express');
let router = express.Router();
let validate = require('express-validation');

let jsonResponse = require("../../../helpers/jsonResponse");
let rules = require('../../../validations');
let config = require('../../../helpers/config');
let RealstateUser = require('../../../models/realstateUser');
let House = require('../../../models/house');
let PaidHouse = require('../../../models/paidHouse');

router.post('/', validate(rules.auth.pay), async (req, res) => {
    let user = req.user;
    const owner = await RealstateUser.find({where: {name: req.body.owner}});
    let house = await owner.getHouse(req.body.id);

    if (!house)
        return res.status(400).json(jsonResponse.error(400, "این خانه در سیستم یافت نشد."));
    if (user.balance < config.HOUSE_OWNER_NUMBER_PRICE)
        return res.status(402).json(jsonResponse.error(402, "اعتبار شما برای دریافت شماره مالک/مشاور کافی نیست."));
    else {
        let paidHouse = await PaidHouse.find({
            where: {
                individualUserId: user.id,
                houseId: house.id,
            }
        });
        if (paidHouse)
            return res.status(400).json(jsonResponse.error(400, "شما قبلا این پرداخت را انجام داده‌اید."));
        else {
            await PaidHouse.create({
                individualUserId: user.id,
                houseId: house.id,
            });
            await user.update({balance: user.balance - config.HOUSE_OWNER_NUMBER_PRICE});
            let result = await House.filterPhone(house, user);
            return res.json(jsonResponse.success("مبلغ ۱۰۰۰ تومان برای دریافت شماره مالک/مشاور از حساب شما کسر شد", result));
        }

    }
});

module.exports = router;