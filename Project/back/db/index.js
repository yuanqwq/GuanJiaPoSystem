const knex = require('knex');
const config = require('./config');
const db = knex({
    client: 'mysql2',
    connection: {
        host : config.host,
        port : config.port,
        user : config.user,
        password : config.password,
        database : config.database
    }
});
module.exports = db;