let express = require('express');
let router = express.Router();

let jsonResponse = require("../../helpers/jsonResponse");

router.get('/profile', (req, res) => {
    let user = req.user;
    user = jsonResponse.filter(user, ["id", "name", "username", "phone", "balance"]);
    res.json(jsonResponse.successData(user));
});

router.post('/pay', (req, res) => {

});

router.post('/charge', (req, res) => {

});

module.exports = router;
