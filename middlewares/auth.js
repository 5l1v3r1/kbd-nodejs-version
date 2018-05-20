let IndividualUser = require('../models/individualUser');

module.exports =  async (req, res, next) => {
    req.user = await IndividualUser.findById(1);
    next();
};

