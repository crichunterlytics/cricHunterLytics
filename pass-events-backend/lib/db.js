const mysql = require('mysql');
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    database: 'pss_event_management',
    password: 'root123'
});

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