const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'184.168.109.23',
    user: 'crichunter',
    database: 'crichunterlytics_staging_db',
    password: 'Cric@Hunter0824'
});
connection.connect();
module.exports = connection;

