const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user: 'crichunter',
    database: 'crichunterlytics_staging_db',
    password: 'Cric@Hunter0824'
});
connection.connect();
module.exports = connection;

