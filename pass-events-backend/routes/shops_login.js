const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const bcrypt = require('bcryptjs');
const midlData = require('../middleware/signup_user.js');
const midlTokenData = require('../middleware/token_interpreter.js');
const mildLogout = require('../middleware/logout_user.js'); 
const mildGenToken = require('../middleware/generate_token.js'); 
const jwt = require('jsonwebtoken');
const { RESET_PASSWORD_API, JWT_SECRET_KEY, JWT_TOKEN_EXPIRY_TIME, REGISTER_NEW_USER, PSS_USERS, BAD_REQUEST_CODE, ERROR_MESSAGES_STATUS_CODE, SUCCESS_STATUS_CODE, LOGIN_USER_API, INVALID_MOBILE_PASSWORD, GENERATE_NEW_TOKEN, LOGOUT_API, INTERNAL_SERVER_ERROR, FORGOT_PASSWORD_API, MOBILE_NUMBER_NOT_EXITS, UPDATE_SHOP_DETAILS, NOT_FOUND_CODE } = require("../constants/constant.js");

// POST API : To register a new user = "register"
router.post(`${REGISTER_NEW_USER}`, midlData.checkAvailability, midlData.validateInput, async (req, res) => {
    const { 
        shop_name, 
        owner_name, 
        email_id, 
        mobile_number, 
        password, 
        shop_address,
        shop_city, 
        shop_state, 
        shop_zipcode,
        registration_number
    } = req.body;

    try {
        // Hash the password
        const password_hash = await bcrypt.hash(password, 10);

        // Insert the user into the database
        const sql = `
            INSERT INTO ${PSS_USERS} (shop_name, owner_name, email_id, mobile_number, password_hash, shop_address, shop_city, shop_state, shop_zipcode, registration_number)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [
            shop_name, 
            owner_name, 
            email_id, 
            mobile_number, 
            password_hash, 
            shop_address, 
            shop_city, 
            shop_state, 
            shop_zipcode,
            registration_number], (err, result) => {
                console.log(err)
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({ 
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }
            res.status(SUCCESS_STATUS_CODE).json({ message: 'User registered successfully' });
        });
    } catch (err) {
        console.error('Error registering user: ' + err.stack);
        res.status(INTERNAL_SERVER_ERROR).json({ 
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });    
    }
});

// PUT API: Update Shop Details
router.put(`${UPDATE_SHOP_DETAILS}`, midlTokenData.verifyToken, async (req, res) => {
    const { 
        shop_name, 
        owner_name, 
        email_id, 
        mobile_number, 
        shop_address,
        shop_city, 
        shop_state, 
        shop_zipcode,
        registration_number,
        shop_id // Add shop_id to identify which shop to update
    } = req.body;

    try {
        // Update the shop details in the database
        const sql = `
            UPDATE ${PSS_USERS}
            SET 
                shop_name = ?,
                owner_name = ?,
                email_id = ?,
                mobile_number = ?,
                shop_address = ?,
                shop_city = ?,
                shop_state = ?,
                shop_zipcode = ?,
                registration_number = ?
            WHERE shop_id = ?`;

        db.query(sql, [
            shop_name, 
            owner_name, 
            email_id, 
            mobile_number, 
            shop_address, 
            shop_city, 
            shop_state, 
            shop_zipcode,
            registration_number,
            shop_id
        ], (err, result) => {
            console.log("Error==", err);
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({ 
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }

            if (result.affectedRows === 0) {
                return res.status(NOT_FOUND_CODE).json({
                    status_code: NOT_FOUND_CODE,
                    message: 'Shop not found'
                });
            }

             // If update is successful, fetch all user data
             const sqlFetchAll = `SELECT * FROM ${PSS_USERS} where shop_id=?`;
             db.query(sqlFetchAll, [shop_id], (err, rows) => {
                 if (err) {
                     return res.status(BAD_REQUEST_CODE).json({ 
                         error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                     });
                 }
 
                 res.status(SUCCESS_STATUS_CODE).json({ 
                     message: 'Shop details updated successfully',
                     data: rows[0] // Return all user data
                 });
             });

            // res.status(SUCCESS_STATUS_CODE).json({ message: 'Shop details updated successfully' });
        });
    } catch (err) {
        console.error('Error updating shop details: ' + err.stack);
        res.status(INTERNAL_SERVER_ERROR).json({ 
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});


// POST API : Login API = "login"
router.post(`${LOGIN_USER_API}`, midlData.checkLoginCredentials, (req, res) => {
    const { mobile_number, password } = req.body;
    console.log("******** Testing *********");
    console.log(mobile_number);
    console.log(password)
    try {
        // Fetch user details by mobile number
        db.query(`SELECT * FROM ${PSS_USERS} WHERE mobile_number = ?`, [mobile_number],(err, result) => {
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
                    { 
                        shop_id: user.shop_id,
                        mobile_number: user.mobile_number                        
                    },
                    JWT_SECRET_KEY,
                    { expiresIn: JWT_TOKEN_EXPIRY_TIME } // Token expiry time
                );

                // Update last_login timestamp
                db.query(`UPDATE ${PSS_USERS} SET last_login = ? WHERE shop_id = ?`, [new Date(), user.shop_id], (err, result) => {
                    console.log("LoggedIn Data=", result)
                    res.status(SUCCESS_STATUS_CODE).json({ 
                        message: 'Login successful', 
                        shopData: {
                            data: user,
                            review_page_url: "https://eventreviews.bizshopmate.com",
                            reports_page_url: "https://eventreports.bizshopmate.com"
                        }, 
                        token 
                    });
                });
            }      
        });
            
    } catch (err) {
        console.error('Error during login: ' + err.stack);
        res.status(INTERNAL_SERVER_ERROR).json({ 
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
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
        res.status(INTERNAL_SERVER_ERROR).json({ 
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// POST API : Logout API = logout
router.post(`${LOGOUT_API}`, mildLogout.verifyToken, (req, res) => {
    // Since JWT is stateless, the best practice is to remove the token from the client side (e.g., localStorage).
    // Optionally, you can implement a token blacklist on the server if needed.
    res.status(SUCCESS_STATUS_CODE).json({ message: 'Logged out successfully' });
});

// POST API to handle forgot password
router.post(`${FORGOT_PASSWORD_API}`, (req, res) => {
    const { mobile_number } = req.body;

    if (!mobile_number) {
        return res.status(BAD_REQUEST_CODE).json({
            success: false,
            message: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
        });
    }

    // Check if the mobile number exists
    const sql = `SELECT * FROM ${PSS_USERS} WHERE mobile_number = ?`;
    db.query(sql, [mobile_number], (err, result) => {
        if (err) {
            return res.status(INTERNAL_SERVER_ERROR).json({
                success_code: INTERNAL_SERVER_ERROR,
                result: false,
                message: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
            });
        }

        if (result.length === 0) {
            return res.status(MOBILE_NUMBER_NOT_EXITS).json({
                success_code: MOBILE_NUMBER_NOT_EXITS,
                result: false,
                message: ERROR_MESSAGES_STATUS_CODE[MOBILE_NUMBER_NOT_EXITS]
            });
        }

        return res.status(SUCCESS_STATUS_CODE).json({
            success_code: SUCCESS_STATUS_CODE,
            message: `Mobile Number verified ${mobile_number}.`,
            result: result[0].shop_id // In real use case, don't send code in response
        });
    });
});

// POST API to reset password
router.post(`${RESET_PASSWORD_API}`, async (req, res) => {
    const { shop_id, new_password } = req.body;

    const password_hash = await bcrypt.hash(new_password, 10);
    console.log("Reset password_hash=", password_hash);
    // Update password in the database
    const updateSql = `UPDATE ${PSS_USERS} SET password_hash = ? WHERE shop_id = ?`;
    db.query(updateSql, [password_hash, shop_id], (updateErr, updateResult) => {
        if (updateErr) {
            return res.status(INTERNAL_SERVER_ERROR).json({
                success: false,
                message: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
            });
        }

        return res.status(200).json({
            success_code: SUCCESS_STATUS_CODE,
            message: 'Password updated successfully.'
        });
    });
});



module.exports = router;
