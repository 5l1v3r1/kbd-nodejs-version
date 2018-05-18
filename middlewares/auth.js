let IndividualUser = require('../models/individualUser');

module.exports =  async function (req, res, next) {
    req.user = await IndividualUser.findById(1);
    next();
};

