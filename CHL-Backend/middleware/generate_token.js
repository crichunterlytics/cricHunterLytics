const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_TOKEN_EXPIRY_TIME } = require('../constants/constant');

module.exports = {
    // Function to generate a new JWT token
    generateToken : (user) => {
        return jwt.sign(
            { user_id: user.user_id, mobile_number: user.mobile_number },
            JWT_SECRET_KEY,
            { expiresIn: JWT_TOKEN_EXPIRY_TIME }
        );
    }
}