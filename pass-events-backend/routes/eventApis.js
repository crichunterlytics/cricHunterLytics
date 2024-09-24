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
        event_description,
        shop_id // optional field
    } = req.body;
    
    // Check if shop_id is present and assign restricted_events accordingly
    const restricted_events = shop_id ? shop_id : 0;

    try {
        // Insert the user into the database
        const sql = `
            INSERT INTO ${PSS_EVENTS_LIST} (
                event_name, 
                event_description,
                restricted_events
            )
            VALUES (?, ?, ?)`;

        db.query(sql, [
            event_name,
            event_description,
            restricted_events // set restricted_events based on shop_id presence
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
    const events = req.body; // Array of event-shop pairs
    
    if (!Array.isArray(events) || events.length === 0) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "Invalid input format or empty array."
        });
    }
    
    try {
        const values = [];
        events.forEach(event => {
            const { event_id, shop_id } = event;
            values.push([event_id, shop_id]);
        });

        // Insert the user into the database with IGNORE for duplicates
        const sql = `
            INSERT IGNORE INTO ${PSS_SHOP_EVENTS_LIST} (
                event_id, 
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
                message: `${result.affectedRows} event(s) added successfully.`,
                duplicate_count: events.length - result.affectedRows // Count ignored duplicates
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});


// REMOVE PSS Shops Events
router.post(`${REMOVE_EVENT_TYPE_SHOP_API}`, midlData.verifyToken, async (req, res) => {
    const events = req.body; // Expecting an array of {shop_id, event_id}

    try {
        const deletePromises = events.map(async ({ event_id, shop_id }) => {
            const deleteSql = `
                DELETE FROM ${PSS_SHOP_EVENTS_LIST} 
                WHERE event_id = ? AND shop_id = ?`;
            
            await db.query(deleteSql, [event_id, shop_id]);
        });

        // Wait for all delete promises to resolve
        await Promise.all(deletePromises);
        
        res.status(SUCCESS_STATUS_CODE).json({ 
            status_code: SUCCESS_STATUS_CODE,
            message: SUCCESS_REMOVE_EVENT_TYPE_MSG
        });
    } catch (err) {
        console.log(err)
        res.status(INTERNAL_SERVER_ERROR).json({ 
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });    
    }
});


// API: Get All PSS Event Types
router.get(`${GET_ALL_PSS_EVENTS_API}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id } = req.params;
  
    let sqlQuery = `SELECT * FROM ${PSS_EVENTS_LIST} s WHERE `;
  
    // If shop_id is provided, add both conditions
    if (shop_id) {
      sqlQuery += ` (s.restricted_events = ? OR s.restricted_events = 0)`;
    } else {
      // If shop_id is not provided, just return events where restricted_events = 0
      sqlQuery += ` s.restricted_events = 0`;
    }
  
    db.query(
      sqlQuery,
      shop_id ? [shop_id] : [], // Provide shop_id as a parameter if it's present, otherwise an empty array
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
        SELECT e.event_id, e.event_name, e.event_description, se.id, se.shop_id 
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
