const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const midlData = require('../middleware/token_interpreter.js');

const {  
    BAD_REQUEST_CODE, 
    ERROR_MESSAGES_STATUS_CODE, 
    SUCCESS_STATUS_CODE, 
    INTERNAL_SERVER_ERROR, 
    ADD_SHOP_THEME_API,
    GET_ALL_SHOP_THEMES_API,
    PSS_EVENT_TYPE,
    SUCCESS_ADD_EVENT_TYPE_MSG,
    SUCCESS_UPDATE_EVENT_TYPE_MSG,
    PSS_EVENT_THEMES_LIST,
    ADD_PSS_THEMES_API,
    UPDATE_PSS_THEMES_API,
    PSS_SHOP_EVENT_THEMES_LIST,
    REMOVE_THEME_TYPE_SHOP_API,
    SUCCESS_REMOVE_EVENT_TYPE_MSG,
    GET_ALL_PSS_THEMES_API
} = require("../constants/constant.js");

// ADD PSS NEW Event Type
router.post(`${ADD_PSS_THEMES_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        event_id,
        theme_name,
        shop_id, // optional field
         //optional Field
    } = req.body;
    
    // Check if shop_id is present and assign restricted_events accordingly
    const restricted_events = shop_id ? shop_id : 0;

    try {
        // Insert the user into the database
        const sql = `
            INSERT INTO ${PSS_EVENT_THEMES_LIST} (
                theme_name, 
                event_id,
                restricted_events
            )
            VALUES (?, ?, ?)`;

        db.query(sql, [
            theme_name,
            event_id,
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
router.put(`${UPDATE_PSS_THEMES_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        theme_name,
        event_id,
        theme_id
    } = req.body;
    
    try {
        // Update the product in the database
        const sql = `
            UPDATE ${PSS_EVENT_TYPE}
            SET 
                theme_name = ?,
                event_id = ?
            WHERE theme_id = ?`;
        db.query(sql, [
            theme_name,
            event_id,
            theme_id
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
router.post(`${ADD_SHOP_THEME_API}`, midlData.verifyToken, async (req, res) => {
    const themes = req.body; // Array of event-shop pairs
    
    if (!Array.isArray(themes) || themes.length === 0) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "Invalid input format or empty array."
        });
    }
    
    try {
        const values = [];
        themes.forEach(event => {
            const { event_id, shop_id, theme_id } = event;
            values.push([event_id, shop_id, theme_id]);
        });

        // Insert the user into the database with IGNORE for duplicates
        const sql = `
            INSERT IGNORE INTO ${PSS_SHOP_EVENT_THEMES_LIST} (
                event_id, 
                shop_id,
                theme_id
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
                duplicate_count: themes.length - result.affectedRows // Count ignored duplicates
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
router.post(`${REMOVE_THEME_TYPE_SHOP_API}`, midlData.verifyToken, async (req, res) => {
    const themes = req.body; // Expecting an array of {shop_id, event_id}

    try {
        const deletePromises = themes.map(async ({ event_id, shop_id }) => {
            const deleteSql = `
                DELETE FROM ${PSS_SHOP_EVENT_THEMES_LIST} 
                WHERE event_id = ? AND shop_id = ? AND theme_id = ?`;
            
            await db.query(deleteSql, [event_id, shop_id, theme_id]);
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
router.get(`${GET_ALL_PSS_THEMES_API}`, midlData.verifyToken, (req, res, next) => {
  const { event_id, shop_id } = req.query;

  // Base query to filter by event_id
  let sqlQuery = `SELECT * FROM ${PSS_EVENT_THEMES_LIST} s WHERE s.event_id = ?`;

  // If shop_id is provided, add conditions for restricted_events
  if (shop_id) {
    sqlQuery += ` AND (s.restricted_events = ? OR s.restricted_events = 0)`;
  } else {
    // If shop_id is not provided, only check restricted_events = 0
    sqlQuery += ` AND s.restricted_events = 0`;
  }

  db.query(
    sqlQuery,
    shop_id ? [event_id, shop_id] : [event_id], // Provide shop_id as a parameter if it's present
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
router.get(`${GET_ALL_SHOP_THEMES_API}`, midlData.verifyToken, (req, res, next) => {
    const { event_id, shop_id } = req.params;
    
    const sql = `
        SELECT e.theme_id, e.event_id, e.theme_name se.id, se.shop_id 
        FROM ${PSS_EVENT_THEMES_LIST} e
        JOIN ${PSS_SHOP_EVENT_THEMES_LIST} se ON e.theme_id = se.theme_id
        WHERE se.shop_id = ? AND se.event_id`;

    db.query(sql, [shop_id, event_id], (error, results) => {
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
