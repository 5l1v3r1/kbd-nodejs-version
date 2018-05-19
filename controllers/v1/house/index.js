let express = require('express');
let router = express.Router();

router.use("/", require("./filter"));
router.use("/", require("./info"));

module.exports = router;