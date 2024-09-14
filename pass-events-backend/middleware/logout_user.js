const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, ACCESS_DENIED_ERROR, ERROR_MESSAGES_STATUS_CODE, INVALID_TOKEN_ERROR, INVALID_MOBILE_PASSWORD } = require('../constants/constant');

// Middleware to verify the JWT token
module.exports = {
    verifyToken : (req, res, next) => {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(ACCESS_DENIED_ERROR).json({ 
                error: ERROR_MESSAGES_STATUS_CODE[ACCESS_DENIED_ERROR] 
            });
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET_KEY);
            req.user = decoded;
            next();
        } catch (ex) {
            res.status(INVALID_MOBILE_PASSWORD).json({ 
                error: 'Invalid token.' 
            });
        }
    }
}