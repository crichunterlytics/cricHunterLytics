const {PSS_USERS, BAD_REQUEST_CODE, ERROR_MESSAGES_STATUS_CODE, LOGIN_UNAUTHORIZED_CODE, INVALID_MOBILE_PASSWORD} = require('../constants/constant');
const db = require("../lib/db.js");
const bcrypt = require('bcryptjs');

module.exports = {
    // Middleware to check if username, mobile number, or email is available
    checkAvailability : (req, res, next) => {
        const { email_id, mobile_number } = req.body;

        try {
            // Check if email already exists
            db.query(`SELECT * FROM ${PSS_USERS} WHERE email_id = ?`, [email_id], (err, result) => {
                if (result.length > 0) {
                    return res.status(INVALID_MOBILE_PASSWORD).json({ error: 'Email already in use' });
                }
                else {
                     // Check if mobile number already exists
                    db.query(`SELECT * FROM ${PSS_USERS} WHERE mobile_number = ?`, [mobile_number], (err, result) => {
                        if (result.length > 0) {
                            return res.status(INVALID_MOBILE_PASSWORD).json({ error: 'Mobile number already in use' });
                        }
                        else {
                            next()
                        }
                    });
                }
            });
            
        } catch (err) {
            console.error('Error checking availability: ' + err.stack);
            res.status(INTERNAL_SERVER_ERROR).json({ 
                error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
            });        
        }
    },

    checkLoginCredentials: async (req, res, next) => {
        const { password, mobile_number } = req.body;
    
        if (!mobile_number || !password) {
            return res.status(BAD_REQUEST_CODE).json({ 
                message: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
            });
        }
    
        try {
            // Check if mobile number exists and get the stored password hash
            db.query(`SELECT * FROM ${PSS_USERS} WHERE mobile_number = ?`, [mobile_number], async (err, result) => {
                if (err) {
                    return res.status(INTERNAL_SERVER_ERROR).json({ 
                        error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
                    });
                }
    
                // If no user found
                if (result.length === 0) {
                    return res.status(LOGIN_UNAUTHORIZED_CODE).json({ 
                        error: ERROR_MESSAGES_STATUS_CODE[LOGIN_UNAUTHORIZED_CODE] 
                    });
                }
    
                const user = result[0]; // Get user data
                const storedHash = user.password_hash;
    
                // Compare the plain password with the hashed password from the database
                const isMatch = await bcrypt.compare(password, storedHash);
    
                if (isMatch) {
                    // Password matches, proceed with next middleware or logic
                    next();
                } else {
                    // Password does not match
                    return res.status(LOGIN_UNAUTHORIZED_CODE).json({ 
                        error: ERROR_MESSAGES_STATUS_CODE[LOGIN_UNAUTHORIZED_CODE] 
                    });
                }
            });
        } catch (err) {
            console.error('Error checking credentials: ' + err.stack);
            return res.status(INTERNAL_SERVER_ERROR).json({ 
                error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR] 
            });
        }
    },

    // Middleware to validate username, password, and confirm password
    validateInput : (req, res, next) => {
        console.log("Request ==", req.body);
        const { password, confirm_password } = req.body;

        // Check password length
        if (password.length < 8) {
            return res.status(LOGIN_UNAUTHORIZED_CODE).json({ error: 'Password must be at least 8 characters long' });
        }

        // Check if password matches confirm password
        // if (password !== confirm_password) {
        //     return res.status(INVALID_MOBILE_PASSWORD).json({ error: 'Passwords do not match' });
        // }

        next();
    }
};