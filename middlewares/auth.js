const {pollapiKey} = require("../config.js")

function checkApiKey(req, res, next) {
    const pollapiKeyClient = req.get('poll-api-key')
    console.log('pollapiKey', pollapiKey)
    if (pollapiKeyClient !== pollapiKey) {
        return res.status(403).send({ permission: "denied" });
    }
    next();
} 

module.exports = {checkApiKey} 