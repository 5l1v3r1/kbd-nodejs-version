let express = require('express');
let router = express.Router();

router.use("/", require("./filter"));

module.exports = router;