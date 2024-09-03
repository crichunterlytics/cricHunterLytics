const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'184.168.109.23',
    user: 'rupalinile',
    database: 'crichunterlytics_staging_db',
    password: 'Nile@Rupali2003'
});
// connection.connect();

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

connection.on('error', (err) => {
    console.error('Database error:', err);
});

module.exports = connection;