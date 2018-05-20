let express = require('express');
let router = express.Router();
let validate = require('express-validation');
let request = require('request');

let jsonResponse = require("../../../helpers/jsonResponse");
let rules = require('../../../validations');
let config = require('../../../helpers/config');

router.post('/', validate(rules.auth.charge), (req, res) => {
    let user = req.user;
    const balanceValue = req.body["balance-value"];
    const options = {
        url: config.BANK_URL,
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "apiKey": config.API_KEY
        },
        data: {
            userId: user.id,
            value: balanceValue
        }
    };

    request(options, async (error, response, body) => {
        if (!error && response.statusCode === 200) {
            await user.update({balance: user.balance + balanceValue});
            res.json(jsonResponse.successMessage("موجودی حساب شما با موفقیت افزایش یافت."));
        }
        else
            res.status(503).json(jsonResponse.error(503, "متاسفانه بانک در دسترس نمی‌باشد."));
    });
});

module.exports = router;