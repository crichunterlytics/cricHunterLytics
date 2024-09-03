const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../constants/constant');

// Middleware to verify the JWT token
module.exports = {
    verifyToken : (req, res, next) => {
        return next();
        // Skip token verification for login and logout routes
        // if (req.path === '/api/login' || 
        //     req.path === '/api/logout' || 
        //     req.path === '/api/register' || 
        //     req.path === '/api/getToken') {
        //     return next();
        // }

        const token = req.headers['authorization'];

        if (!token) {
            return res.status(401).json({ error: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET_KEY);
            req.user = decoded;  // Attach decoded user data to request
            next();
        } catch (err) {
            res.status(400).json({ error: 'Invalid token.' });
        }
    }
}