const bcrypt = require('bcrypt');
const { sql, poolPromise } = require('../config/db-connection');

const login = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;

        // Conexión a la base de datos
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM task_owner WHERE username = @username');

        const user = result.recordset[0];

        // Validar credenciales
        if (user && password === user.password) { // Comparación casera
            req.session.user = { id: user.id_user, username: user.username }; // Guardar usuario en sesión
            console.log(req.session.user);
            res.status(200).json({ message: 'Login successful', user: req.session.user });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Something went wrong while logging in' });
    }
};

const sessionStatus = (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({ message: 'Session active', user: req.session });
    } else {
        res.status(200).json({ message: 'No active session' });
    }
};

module.exports = { login, sessionStatus };