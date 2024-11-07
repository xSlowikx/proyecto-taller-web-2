const express = require('express');
const bodyParser = require('body-parser');
const { poolPromise} = require('./db-connection');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Test endpoint
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/test-db', async (req, res) => {
        try {
            const pool = await poolPromise;
            const result = await pool.request().query('SELECT 1 AS result');
            res.status(200).json(result.recordset);
        } catch (err) {
            res.status(500).send(err.message);
        }
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
