const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const midlData = require('../middleware/token_interpreter.js');

const {  
    BAD_REQUEST_CODE, 
    ERROR_MESSAGES_STATUS_CODE, 
    SUCCESS_STATUS_CODE, 
    INTERNAL_SERVER_ERROR, 
    ADD_SHOP_EVENT_TYPE_API,
    GET_ALL_EVENTS_API,
    PSS_EVENT_TYPE,
    SUCCESS_ADD_EVENT_TYPE_MSG,
    SUCCESS_UPDATE_EVENT_TYPE_MSG,
    GET_ALL_PSS_EVENTS_API,
    PSS_EVENTS_LIST,
    ADD_PSS_EVENTS_API,
    UPDATE_PSS_EVENTS_API,
    PSS_SHOP_EVENTS_LIST,
    REMOVE_EVENT_TYPE_SHOP_API,
    SUCCESS_REMOVE_EVENT_TYPE_MSG
} = require("../constants/constant.js");

// ADD PSS NEW Event Type
router.post(`${ADD_PSS_EVENTS_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        event_name,
        event_description
    } = req.body;
    
    try {
        // Insert the user into the database
        const sql = `
            INSERT INTO ${PSS_EVENTS_LIST} (
                event_name, 
                event_description
            )
            VALUES (?, ?)`;

        db.query(sql, [
            event_name,
            event_description
        ], (err, result) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({ 
                    status_code: BAD_REQUEST_CODE,
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }
            res.status(SUCCESS_STATUS_CODE).json({ 
                status_code: SUCCESS_STATUS_CODE,
                message: SUCCESS_ADD_EVENT_TYPE_MSG
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ 
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });    
    }
});

// Update PSS Event TYpe
router.put(`${UPDATE_PSS_EVENTS_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        event_name,
        event_description,
        event_id
    } = req.body;
    
    try {
        // Update the product in the database
        const sql = `
            UPDATE ${PSS_EVENT_TYPE}
            SET 
                event_name = ?,
                event_description = ?
            WHERE event_id = ?`;
        db.query(sql, [
            event_name,
            event_description, 
            event_id
        ], (err, result) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({ 
                    status_code: BAD_REQUEST_CODE,
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }
            if (result.affectedRows === 0) {
                return res.status(NOT_FOUND_CODE).json({
                    status_code: NOT_FOUND_CODE,
                    message: 'Event Type Not Found'
                });
            }
            res.status(SUCCESS_STATUS_CODE).json({ 
                status_code: SUCCESS_STATUS_CODE,
                message: SUCCESS_UPDATE_EVENT_TYPE_MSG 
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// ADD PSS Shops Events
router.post(`${ADD_SHOP_EVENT_TYPE_API}`, midlData.verifyToken, async (req, res) => {
    const events = req.body; // Expecting an array of event objects

    try {
        const sqlCheck = `
            SELECT event_id FROM ${PSS_SHOP_EVENTS_LIST} WHERE shop_id = ? AND event_id = ?`;

        const sqlInsert = `
            INSERT INTO ${PSS_SHOP_EVENTS_LIST} (event_id, shop_id)
            VALUES (?, ?)`;

        const promises = events.map(async (event) => {
            const { shop_id, event_id } = event;
            // Check if the combination already exists
            const [rows] = await db.query(sqlCheck, [shop_id, event_id]);
            if (rows.length === 0) {
                // If not, insert the new entry
                await db.query(sqlInsert, [event_id, shop_id]);
            }
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        // Commit the transaction
        await db.commit();
        
        res.status(SUCCESS_STATUS_CODE).json({ 
            status_code: SUCCESS_STATUS_CODE,
            message: SUCCESS_ADD_EVENT_TYPE_MSG
        });
    } catch (err) {
        // Rollback the transaction in case of error
        res.status(INTERNAL_SERVER_ERROR).json({ 
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });    
    }
});

// REMOVE PSS Shops Events
router.delete(`${REMOVE_EVENT_TYPE_SHOP_API}`, midlData.verifyToken, async (req, res) => {
    const { events } = req.body; // Expecting an array of event objects

    try {
        // Start a database transaction
        await db.beginTransaction();

        const sqlDelete = `
            DELETE FROM ${PSS_SHOP_EVENTS_LIST} WHERE shop_id = ? AND event_id = ?`;

        const promises = events.map(async (event) => {
            const { event_id, shop_id } = event;

            // Delete the entry based on shop_id and event_id
            await db.query(sqlDelete, [shop_id, event_id]);
        });

        // Wait for all promises to resolve
        await Promise.all(promises);

        // Commit the transaction
        await db.commit();
        
        res.status(SUCCESS_STATUS_CODE).json({ 
            status_code: SUCCESS_STATUS_CODE,
            message: SUCCESS_REMOVE_EVENT_TYPE_MSG
        });
    } catch (err) {
        // Rollback the transaction in case of error
        res.status(INTERNAL_SERVER_ERROR).json({ 
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });    
    }
});

// API : Get All PSS Event Types
router.get(`${GET_ALL_PSS_EVENTS_API}`, midlData.verifyToken, (req, res, next) => {
      db.query(
        `SELECT * FROM ${PSS_EVENTS_LIST}`,
        [],
        function (error, results, fields) {
          if (error) {
            return res.status(BAD_REQUEST_CODE).send({
              msg: error,
              err: true,
              status_code: BAD_REQUEST_CODE,
              data: []
            });
          }
          return res.status(SUCCESS_STATUS_CODE).send({
            data: results,
            err: false,
            status_code: SUCCESS_STATUS_CODE
          });
        }
      );
});

// API : Get All Event Types for shops
router.get(`${GET_ALL_EVENTS_API}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id } = req.params;
    
    const sql = `
        SELECT e.*, se.* 
        FROM ${PSS_EVENTS_LIST} e
        JOIN ${PSS_SHOP_EVENTS_LIST} se ON e.event_id = se.event_id
        WHERE se.shop_id = ?`;

    db.query(sql, [shop_id], (error, results) => {
        if (error) {
            return res.status(BAD_REQUEST_CODE).send({
                msg: error,
                err: true,
                status_code: BAD_REQUEST_CODE,
                data: []
            });
        }
        return res.status(SUCCESS_STATUS_CODE).send({
            data: results,
            err: false,
            status_code: SUCCESS_STATUS_CODE
        });
    });
});


module.exports = router;
