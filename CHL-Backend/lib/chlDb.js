const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'crichunterlytics_db',
    password: 'root123'
});
connection.connect();
module.exports = connection;

