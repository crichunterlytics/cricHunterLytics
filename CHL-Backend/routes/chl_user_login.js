const express = require("express");
const router = express.Router();
const db = require("../lib/chlDb.js");
const bcrypt = require('bcryptjs');
const midlData = require('../middleware/signup_user.js');
const mildLogout = require('../middleware/logout_user.js'); 
const mildGenToken = require('../middleware/generate_token.js'); 
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY, JWT_TOKEN_EXPIRY_TIME, REGISTER_NEW_USER, CHL_USERS, DB_QUERY_FAILED_CODE, ERROR_MESSAGES_STATUS_CODE, SUCCESS_STATUS_CODE, LOGIN_USER_API, INVALID_MOBILE_PASSWORD, GENERATE_NEW_TOKEN, LOGOUT_API } = require("../constants/constant.js");

// POST API : To register a new user = "register"
router.post(`${REGISTER_NEW_USER}`, midlData.checkAvailability, midlData.validateInput, async (req, res) => {
    const { first_name, last_name, email_id, mobile_number, password } = req.body;

    try {
        // Hash the password
        const password_hash = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const sql = `
            INSERT INTO ${CHL_USERS} (first_name, last_name, email_id, mobile_number, password_hash)
            VALUES (?, ?, ?, ?, ?)`;

        db.query(sql, [first_name, last_name, email_id, mobile_number, password_hash], (err, result) => {
            if (err) {
                return res.status(DB_QUERY_FAILED_CODE).json({ 
                    error: ERROR_MESSAGES_STATUS_CODE[DB_QUERY_FAILED_CODE]
                });
            }
            res.status(SUCCESS_STATUS_CODE).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        console.error('Error registering user: ' + err.stack);
        res.status(DB_QUERY_FAILED_CODE).json({ error: ERROR_MESSAGES_STATUS_CODE[DB_QUERY_FAILED_CODE] });
    }
});

// POST API : Login API = "login"
router.post(`${LOGIN_USER_API}`, (req, res) => {
    const { mobile_number, password } = req.body;
    try {
        // Fetch user details by mobile number
        db.query(`SELECT * FROM ${CHL_USERS} WHERE mobile_number = ?`, [mobile_number],(err, result) => {
            if (result.length === 0) {
                return res.status(INVALID_MOBILE_PASSWORD).json({ 
                    error: ERROR_MESSAGES_STATUS_CODE[INVALID_MOBILE_PASSWORD] 
                });
            }
            else {
                const user = result[0];

                // Compare provided password with stored hash
                const isPasswordValid = bcrypt.compare(password, user.password_hash);
                if (!isPasswordValid) {
                    return res.status(INVALID_MOBILE_PASSWORD).json({ 
                        error: ERROR_MESSAGES_STATUS_CODE[INVALID_MOBILE_PASSWORD] 
                    });
                }

                // Generate JWT token
                const token = jwt.sign(
                    { user_id: user.user_id, mobile_number: user.mobile_number },
                    JWT_SECRET_KEY,
                    { expiresIn: JWT_TOKEN_EXPIRY_TIME } // Token expiry time
                );

                // Update last_login timestamp
                db.query(`UPDATE ${CHL_USERS} SET last_login = ? WHERE user_id = ?`, [new Date(), user.user_id], (err, result) => {
                    res.status(SUCCESS_STATUS_CODE).json({ message: 'Login successful', token });
                });
            }      
        });
            
    } catch (err) {
        console.error('Error during login: ' + err.stack);
        res.status(DB_QUERY_FAILED_CODE).json({ 
            error: ERROR_MESSAGES_STATUS_CODE[DB_QUERY_FAILED_CODE] 
        });
    }
});

//POST API : Generate new Token = 'getToken
router.post(`${GENERATE_NEW_TOKEN}`, (req, res) => {
    const { token } = req.body;

    try {
        // Verify the token, but do not handle expired error here
        const decoded = jwt.verify(token, JWT_SECRET_KEY, { ignoreExpiration: true });

        // Check if the token has expired
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp < currentTime) {
            // Token has expired, generate a new token
            const newToken = mildGenToken.generateToken(decoded);
            return res.status(SUCCESS_STATUS_CODE).json({ token: newToken, message: 'New token generated' });
        }

        // Token is still valid, return the existing token
        res.status(SUCCESS_STATUS_CODE).json({ token, message: 'Token is still valid' });
    } catch (err) {
        console.error('Error during login: ' + err.stack);
        res.status(DB_QUERY_FAILED_CODE).json({ 
            error: ERROR_MESSAGES_STATUS_CODE[DB_QUERY_FAILED_CODE] 

        });
    }
});

// POST API : Logout API = logout
router.post(`${LOGOUT_API}`, mildLogout.verifyToken, (req, res) => {
    // Since JWT is stateless, the best practice is to remove the token from the client side (e.g., localStorage).
    // Optionally, you can implement a token blacklist on the server if needed.
    res.status(SUCCESS_STATUS_CODE).json({ message: 'Logged out successfully' });
});

module.exports = router;
