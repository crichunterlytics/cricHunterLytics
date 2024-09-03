const {CHL_USERS, INVALID_MOBILE_PASSWORD} = require('../constants/constant');
const db = require("../lib/chlDb.js");
module.exports = {
    // Middleware to check if username, mobile number, or email is available
    checkAvailability : (req, res, next) => {
        const { email_id, mobile_number } = req.body;

        try {
            // Check if email already exists
            db.query(`SELECT * FROM ${CHL_USERS} WHERE email_id = ?`, [email_id], (err, result) => {
                if (result.length > 0) {
                    return res.status(INVALID_MOBILE_PASSWORD).json({ error: 'Email already in use' });
                }
                else {
                     // Check if mobile number already exists
                    db.query(`SELECT * FROM ${CHL_USERS} WHERE mobile_number = ?`, [mobile_number], (err, result) => {
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
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Middleware to validate username, password, and confirm password
    validateInput : (req, res, next) => {
        const { password, confirm_password } = req.body;

        // Check password length
        if (password.length < 8) {
            return res.status(INVALID_MOBILE_PASSWORD).json({ error: 'Password must be at least 8 characters long' });
        }

        // Check if password matches confirm password
        if (password !== confirm_password) {
            return res.status(INVALID_MOBILE_PASSWORD).json({ error: 'Passwords do not match' });
        }

        next();
    }
};