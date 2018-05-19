let express = require('express');
let router = express.Router();

let jsonResponse = require("../../helpers/jsonResponse");

router.get('/', (req, res) => {
    res.send('OK');
});

router.post('/login', (req, res) => {
    let user = req.user;
    user = jsonResponse.filter(user, ["id", "name", "balance"]);
    res.json(jsonResponse.successData(user));
});

module.exports = router;
