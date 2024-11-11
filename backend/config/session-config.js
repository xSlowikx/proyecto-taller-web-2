const session = require('express-session');

const sessionMiddleware = session({
    secret: 'your-secret-key', // Cambiar por una clave más segura
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Cambiar a `true` si usas HTTPS
});

module.exports = sessionMiddleware;
