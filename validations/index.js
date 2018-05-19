let Joi = require('joi');

module.exports = {
    charge: {
        body: {
            "balance-value": Joi.number().required()
        }
    },
    house: {
        filter: {
            query: {
                "building-type": Joi.string().required(),
                "deal-type": Joi.string().required(),
            }
        }
    }
};