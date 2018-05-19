let express = require('express');
let router = express.Router();

router.use("/profile", require("./profile"));
router.use("/pay", require("./pay"));
router.use("/charge", require("./charge"));

module.exports = router;