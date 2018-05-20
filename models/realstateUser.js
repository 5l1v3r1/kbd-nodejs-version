let Sequelize = require('sequelize');
let sequelize = require('../helpers/database');
let Houses = require('./house');
let KhaneBeDoosh = require('./realstateUsers/khaneBeDoosh');

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
    await Houses.deleteAllByOwner(this.id);
};

RealstateUser.prototype.updateHouses = async function() {
    await this.deleteAllHouses();
    const options = {
        url: this.url + '/house',
        method: "GET",
        headers: {
            "Content-type": "application/json",
        }
    };
    request(options, async (error, response, body) => {
        if (!error && response.statusCode === 200) {
            if(this.name === 'khane-be-doosh') {
                body = JSON.parse(response.body);
                await KhaneBeDoosh.addHouse(this.id, body);
                setTimeout(() => {
                    this.updateHouses();
                }, body.expireTime - Time.now());
            }
        }
    });
};

RealstateUser.updateAll = async () => {
    let realStates = await RealstateUser.findAll({
        where: {
            name: {[!Op]: 'system'},
        }
    });
    for(let i in realStates) {
        realStates.updateHouses();
    }
};

module.exports = RealstateUser;