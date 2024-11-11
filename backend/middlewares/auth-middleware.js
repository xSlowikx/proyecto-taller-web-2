const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        // Si el usuario está autenticado, continúa con la siguiente función
        next();
    } else {
        // Si no está autenticado, responde con un error
        res.status(401).json({ message: 'Unauthorized: Please log in first' });
    }
};

module.exports = { isAuthenticated };
