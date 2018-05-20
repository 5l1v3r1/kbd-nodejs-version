let request = require('request');
let asyncRequest = require('async-request');
let Sequelize = require('sequelize');
let sequelize = require('../helpers/database');
let House = require('./house');
let KhaneBeDoosh = require('./realstateUsers/khaneBeDoosh');
const Op = Sequelize.Op;

const RealstateUser = sequelize.define('realstate_users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: Sequelize.STRING,
    api_address: Sequelize.STRING
});

RealstateUser.prototype.deleteAllHouses = async function() {
    await House.deleteAllByOwner(this.id);
};

RealstateUser.prototype.updateHouses = async function() {
    await this.deleteAllHouses();
    const options = {
        url: this.api_address + '/house',
        method: "GET",
        headers: {
            "Content-type": "application/json",
        }
    };
    request(options, async (error, response, body) => {
        if (!error && response.statusCode === 200) {
            if(this.name === 'khane-be-doosh') {
                body = JSON.parse(response.body);
                KhaneBeDoosh.addHouse(this.id, body);
                const date = new Date();
                const now = date.getTime();
                setTimeout(() => {
                    this.updateHouses();
                }, body.expireTime - now);
            }
        }
    });
};

RealstateUser.prototype.getHouse = async function(id) {
    if (this.name === 'system')
        return await House.findById(id);
    else {
        const options = {
            method: "GET",
            headers: {
                "Content-type": "application/json",
            }
        };
        try {
            let response = await asyncRequest(this.api_address + '/house/' + id, options);
            if(this.name === 'khane-be-doosh') {
                let body = JSON.parse(response.body);
                return await KhaneBeDoosh.getHouse(body);
            }
        } catch (error) {
            console.log(error);
        }
    }
};

RealstateUser.updateAll = async () => {
    let realStates = await RealstateUser.findAll({
        where: {
            name: {[Op.not]: 'system'},
        }
    });
    for(let i in realStates) {
        realStates[i].updateHouses();
    }
};

module.exports = RealstateUser;