const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.user) {
        
        next();
    } else {
      
        res.status(401).json({ message: 'Unauthorized: Please log in first' });
    }
};

module.exports = { isAuthenticated };
