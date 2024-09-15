const mysql = require('mysql');
const connection = mysql.createConnection({
    host: '184.168.109.23',
    user: 'rupalinile',
    database: 'pss_event_management',
    password: 'Nile@Rupali2003',
    connectTimeout: 10000, // 10 seconds
    acquireTimeout: 10000, // 10 seconds
    keepAlive: true,       // Enable keep-alive
    connectionLimit: 10    // Limit number of connections to the DB
});

connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to the database.');
});

connection.on('error', (err) => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Database connection was closed.');
    } else if (err.code === 'ECONNRESET') {
        console.error('Connection was reset.');
        // You can also try to reconnect here.
    } else {
        console.error('Database error:', err);
    }
});

module.exports = connection;
