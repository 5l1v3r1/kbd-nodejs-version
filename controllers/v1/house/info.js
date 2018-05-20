let express = require('express');
let router = express.Router();

let jsonResponse = require("../../../helpers/jsonResponse");
let RealstateUser = require('../../../models/realstateUser');
let House = require('../../../models/house');

router.get("/:owner/:id", async (req, res) => {
    const owner = await RealstateUser.find({where: {name: req.params.owner}});
    let house = await owner.getHouse(req.params.id);

    house = await House.filterPhone(house, req.user);
    res.json(jsonResponse.successData(house));
});

module.exports = router;