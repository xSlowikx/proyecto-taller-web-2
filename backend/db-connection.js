const sql = require('mssql');
require('dotenv').config({path: './db-config.env'}); // Carga las variables desde db-config.env

const dbConfig = {
    user: process.env.DB_USER, // third_party_apps
    password: process.env.DB_PASSWORD, // mG3~S6,mC70$p.VnJL]A
    server: process.env.DB_SERVER, // LEGION
    database: process.env.DB_NAME, // to-do-app
    options: {
        encrypt: false, // Cambia a true si usas Azure u otra configuración que lo requiera
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};

console.log(dbConfig);

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to SQL Server');
        return pool;
    })
    .catch(err => {
        console.error('Database Connection Failed!', err);
        throw err;
    });

module.exports = { sql, poolPromise };
