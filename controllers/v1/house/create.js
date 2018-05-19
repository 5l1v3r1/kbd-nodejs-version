let express = require('express');
let router = express.Router();

let jsonResponse = require("../../../helpers/jsonResponse");

router.get("/", (req, res) => {
    let user = req.user;
    user = jsonResponse.filter(user, ["id", "name", "username", "phone", "balance"]);
    res.json(jsonResponse.successData(user));
});

module.exports = router;