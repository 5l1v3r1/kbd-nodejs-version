let Joi = require('joi');

module.exports = {
    auth: {
        charge: {
            body: {
                "balance-value": Joi.number().required()
            }
        },
        pay: {
            body: {
                id: Joi.string().required(),
                owner: Joi.string().required(),
            }
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