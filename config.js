const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    dbPass : process.env.DB_PASSWORD,
    dbUser : process.env.DB_USERNAME,
    dbName : process.env.DB_NAME,
    darkSkyEndPoint : process.env.DARKSKY_END
};