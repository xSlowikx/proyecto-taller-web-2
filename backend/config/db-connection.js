const sql = require('mssql');
require('dotenv').config({ path: './db-config.env' });

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Usar true si estás en Azure; false para local
        trustServerCertificate: true // Solo para desarrollo local
    },
    port: parseInt(process.env.DB_PORT, 10) || 1433 // Asegúrate de usar un número
};

console.log(config);

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed! Error: ', err);
        throw err;
    });

module.exports = { sql, poolPromise };
