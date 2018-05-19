let express = require('express');
let router = express.Router();

let jsonResponse = require("../../../helpers/jsonResponse");
let House = require('../../../models/house');

router.get("/:owner/:id", async (req, res) => {
    let house = {};
    if (req.params.owner === 'system') {
        house = await House.findById(req.params.id);
        house = await house.filterPhone(req.user);
    }
    else {
        // TODO: get house from realstate server
    }
    res.json(jsonResponse.successData(house));
});

module.exports = router;