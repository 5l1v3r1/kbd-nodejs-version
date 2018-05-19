let express = require('express');
let router = express.Router();

let jsonResponse = require("../../../helpers/jsonResponse");

router.post('/', (req, res) => {
    console.log("salam");
});

module.exports = router;