const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, TOKEN_UNAUTHORIZED_CODE, TOKEN_INVALID_CODE } = require('../constants/constant');

// Middleware to verify the JWT token
module.exports = {
    verifyToken : (req, res, next) => {
        console.log("req=", req);
        return next();
        //Skip token verification for login and logout routes
        if (req.path === '/api/login' || 
            req.path === '/api/logout' || 
            req.path === '/api/register' || 
            req.path === '/api/forgot-password' ||
            req.path === '/api/reset-password' ||
            req.path === '/api/getToken') {
            return next();
        }
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(TOKEN_UNAUTHORIZED_CODE).json({ error: 'Access denied. No token provided.' });
        }
        try {
            const decoded = jwt.verify(token, JWT_SECRET_KEY);
            req.user = decoded;  // Attach decoded user data to request
            next();
        } catch (err) {
            res.status(TOKEN_INVALID_CODE).json({ error: 'Invalid token.' });
        }
    }
}