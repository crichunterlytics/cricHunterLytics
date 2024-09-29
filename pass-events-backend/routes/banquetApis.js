const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const midlData = require('../middleware/token_interpreter.js');

const {  
    BAD_REQUEST_CODE, 
    ERROR_MESSAGES_STATUS_CODE, 
    SUCCESS_STATUS_CODE, 
    INTERNAL_SERVER_ERROR, 
    NOT_FOUND_CODE,
    BANQUET_DATA_TABLE, // Define your constant for banquet data table
    ADD_BANQUET_API, // Define your constant for add banquet API
    UPDATE_BANQUET_API, // Define your constant for update banquet API
    DELETE_BANQUET_API, // Define your constant for delete banquet API
    GET_BANQUET_API, // Define your constant for get banquet API
    SUCCESS_ADD_BANQUET_MSG // Define your constant for success message
} = require("../constants/constant.js");

// Add Banquet
router.post(`${ADD_BANQUET_API}`, midlData.verifyToken, async (req, res) => {
    const { banquet_name, banquet_address, shop_id } = req.body;

    if (!banquet_name || !banquet_address || !shop_id) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "Banquet name, address, and shop ID are required"
        });
    }

    try {
        const sql = `
            INSERT INTO ${BANQUET_DATA_TABLE} (banquet_name, banquet_address, shop_id) 
            VALUES (?, ?, ?)`;

        db.query(sql, [banquet_name, banquet_address, shop_id], (err, result) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({
                    status_code: BAD_REQUEST_CODE,
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }
            res.status(SUCCESS_STATUS_CODE).json({
                status_code: SUCCESS_STATUS_CODE,
                message: SUCCESS_ADD_BANQUET_MSG
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// Update Banquet API
router.put(`${UPDATE_BANQUET_API}`, midlData.verifyToken, async (req, res) => {
    const { banquet_id, banquet_name, banquet_address, shop_id } = req.body;

    if (!banquet_id) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "Banquet ID is required"
        });
    }

    try {
        const sql = `
            UPDATE ${BANQUET_DATA_TABLE}
            SET 
                banquet_name = ?,
                banquet_address = ?,
                shop_id = ?
            WHERE 
            banquet_id = ?`;

        db.query(sql, [banquet_name, banquet_address, shop_id, banquet_id], (err, result) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({
                    status_code: BAD_REQUEST_CODE,
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }

            if (result.affectedRows === 0) {
                return res.status(NOT_FOUND_CODE).json({
                    status_code: NOT_FOUND_CODE,
                    error: "Banquet not found"
                });
            }

            res.status(SUCCESS_STATUS_CODE).json({
                status_code: SUCCESS_STATUS_CODE,
                message: "Banquet updated successfully"
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// Delete Banquet
router.delete(`${DELETE_BANQUET_API}`, midlData.verifyToken, async (req, res) => {
    const { banquet_id } = req.body; // Expecting the id of the banquet to delete

    if (!banquet_id) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "No banquet ID provided"
        });
    }

    try {
        const sql = `DELETE FROM ${BANQUET_DATA_TABLE} WHERE banquet_id = ?`;

        db.query(sql, [banquet_id], (err, result) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({
                    status_code: BAD_REQUEST_CODE,
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }

            // Check if any rows were affected (deleted)
            if (result.affectedRows === 0) {
                return res.status(NOT_FOUND_CODE).json({
                    status_code: NOT_FOUND_CODE,
                    message: "No banquet found for the provided ID"
                });
            }

            res.status(SUCCESS_STATUS_CODE).json({
                status_code: SUCCESS_STATUS_CODE,
                message: "Banquet deleted successfully"
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// Get Banquets
router.get(`${GET_BANQUET_API}`, midlData.verifyToken, async (req, res) => {
    const { shop_id } = req.query; // Get shop_id from query parameters

    if (!shop_id) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "Shop ID is required"
        });
    }

    try {
        const sql = `SELECT * FROM ${BANQUET_DATA_TABLE} WHERE shop_id = ?`;

        db.query(sql, [shop_id], (err, results) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({
                    status_code: BAD_REQUEST_CODE,
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }

            if (results.length === 0) {
                return res.status(SUCCESS_STATUS_CODE).json({
                    status_code: SUCCESS_STATUS_CODE,
                    data: [],
                    message: "No banquets found"
                });
            }

            res.status(SUCCESS_STATUS_CODE).json({
                status_code: SUCCESS_STATUS_CODE,
                data: results
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

module.exports = router;
