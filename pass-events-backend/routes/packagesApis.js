const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const midlData = require('../middleware/token_interpreter.js');

const {  
    BAD_REQUEST_CODE, 
    ERROR_MESSAGES_STATUS_CODE, 
    SUCCESS_STATUS_CODE, 
    INTERNAL_SERVER_ERROR, 
    PSS_PACKAGES_TABLE,
    ADD_PACKAGES_API,
    UPDATE_PACKAGES_API,
    SUCCESS_ADD_PACKAGE_MSG,
    DELETE_PACKAGES_API,
    GET_PACKAGES_API
} = require("../constants/constant.js");

//Add Packages 
router.post(`${ADD_PACKAGES_API}`, midlData.verifyToken, async (req, res) => {
    const { packages, shop_id } = req.body; // `packages` will be an array of packages
    const ps_sid = shop_id ? shop_id : 0;

    if (!packages || packages.length === 0) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "No packages provided"
        });
    }

    const values = packages.map(package => [
        package.package_name,
        package.item_count || 0, // Default item_count to 0 if not provided
        package.restricted_package || 0, // Default restricted_package to 0 if not provided
        package.event_id || 0, // Default event_id to 0 if not provided
        package.theme_id || 0, // Default theme_id to 0 if not provided
        ps_sid
    ]);

    try {
        // Insert multiple packages into the database using bulk insert
        const sql = `
            INSERT INTO ${PSS_PACKAGES_TABLE} (
                package_name, 
                item_count,
                restricted_package,
                event_id,
                theme_id,
                shop_id
            ) VALUES ?`;

        db.query(sql, [values], (err, result) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({
                    status_code: BAD_REQUEST_CODE,
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }
            res.status(SUCCESS_STATUS_CODE).json({
                status_code: SUCCESS_STATUS_CODE,
                message: SUCCESS_ADD_PACKAGE_MSG
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// Update Package API
router.put(`${UPDATE_PACKAGES_API}`, midlData.verifyToken, async (req, res) => {
    const { package_id, package_name, item_count = 0, event_id = 0, theme_id = 0, restricted_package = 0, shop_id } = req.body;

    if (!package_id) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "Package ID is required"
        });
    }

    try {
        const sql = `
            UPDATE ${PSS_PACKAGES_TABLE}
            SET 
                package_name = ?,
                item_count = ?,
                restricted_package = ?,
                event_id = ?,
                theme_id = ?,
                shop_id = ?
            WHERE 
                package_id = ?`;

        db.query(sql, [package_name, item_count, restricted_package, event_id, theme_id, shop_id, package_id], (err, result) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({
                    status_code: BAD_REQUEST_CODE,
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }

            if (result.affectedRows === 0) {
                return res.status(NOT_FOUND_CODE).json({
                    status_code: NOT_FOUND_CODE,
                    error: "Package not found"
                });
            }

            res.status(SUCCESS_STATUS_CODE).json({
                status_code: SUCCESS_STATUS_CODE,
                message: "Package updated successfully"
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// Delete Packages
router.delete(`${DELETE_PACKAGES_API}`, midlData.verifyToken, async (req, res) => {
    const { package_ids } = req.body; // Expecting an array of package_ids

    if (!package_ids || package_ids.length === 0) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "No package_ids provided"
        });
    }

    // Generate a dynamic placeholders string for the number of package_ids
    const placeholders = package_ids.map(() => '?').join(', ');

    try {
        // Perform the delete operation for multiple package_ids
        const sql = `DELETE FROM ${PSS_PACKAGES_TABLE} WHERE package_id IN (${placeholders})`;

        db.query(sql, package_ids, (err, result) => {
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
                    message: "No packages found for the provided package_ids"
                });
            }

            res.status(SUCCESS_STATUS_CODE).json({
                status_code: SUCCESS_STATUS_CODE,
                message: "Packages deleted successfully"
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// Get Packages
router.get(`${GET_PACKAGES_API}`, midlData.verifyToken, async (req, res) => {
    const { shop_id, restricted_package, event_id, theme_id } = req.query; // Get shop_id and optional restricted_package

    if (!shop_id) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "Shop ID is required"
        });
    }

    // Prepare the SQL query
    let sqlQuery = `SELECT * FROM ${PSS_PACKAGES_TABLE} WHERE shop_id = ?`;
    const queryParams = [shop_id];

    // Check if restricted_package is provided
    if (restricted_package !== undefined) {
        sqlQuery += ` AND restricted_package = ?`;
        queryParams.push(restricted_package);
    }

    // Check if event_id is provided
    if (event_id !== undefined) {
        sqlQuery += ` AND event_id = ?`;
        queryParams.push(event_id);
    }

    // Check if theme_id is provided
    if (theme_id !== undefined) {
        sqlQuery += ` AND theme_id = ?`;
        queryParams.push(theme_id);
    }

    try {
        db.query(sqlQuery, queryParams, (err, results) => {
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
                    message: "No packages found"
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
