let express = require('express');
let router = express.Router();

let jsonResponse = require("../../../helpers/jsonResponse");
let House = require('../../../models/house');

router.get("/:owner/:id", async (req, res) => {
    let house = {};
    if (req.params.owner === 'system') {
        house = await House.findById(req.params.id);
    }
    else {
        // TODO: get house from realstate server
    }
    house = await house.filterPhone(req.user);
    res.json(jsonResponse.successData(house));
});

module.exports = router;