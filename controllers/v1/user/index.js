let express = require('express');
let router = express.Router();

router.use("/login", require("./login"));

module.exports = router;