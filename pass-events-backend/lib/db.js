const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,  // Limit the number of concurrent connections
    host: '184.168.109.23',
    user: 'rupalinile',
    database: 'pss_event_management',
    password: 'Nile@Rupali2003',
    connectTimeout: 10000,  // 10 seconds
    acquireTimeout: 10000,  // 10 seconds
    waitForConnections: true,
    queueLimit: 0           // Disable queue limit
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
    connection.release();  // Release the connection back to the pool
});

pool.on('error', (err) => {
    console.error('Database error:', err);
    if (err.code === 'ECONNRESET') {
        console.error('Connection was reset.');
    }
});

module.exports = pool;
