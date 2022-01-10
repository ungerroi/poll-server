const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    pollapiKey: process.env.POLL_API_KEY,
    port: process.env.PORT
};