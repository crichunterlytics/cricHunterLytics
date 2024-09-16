const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const midlData = require('../middleware/token_interpreter.js');

const {  
    BAD_REQUEST_CODE, 
    ERROR_MESSAGES_STATUS_CODE, 
    SUCCESS_STATUS_CODE, 
    INTERNAL_SERVER_ERROR, 
    ADD_EVENT_THEME_API,
    UPDATE_EVENT_THEME_API,
    GET_EVENT_THEMES_API,
    PSS_EVENT_THEMES,
    GET_EVENT_ALLTHEMES_API
} = require("../constants/constant.js");

// POST API : Add New Event Type
router.post(`${ADD_EVENT_THEME_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        theme_name,
        event_id,
        shop_id
    } = req.body;
    
    try {
        // Insert the user into the database
        const sql = `
            INSERT INTO ${PSS_EVENT_THEMES} (
                theme_name, 
                event_id,
                shop_id
            )
            VALUES (?, ?, ?)`;

        db.query(sql, [
            theme_name, 
            event_id,
            shop_id
        ], (err, result) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({ 
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }
            res.status(SUCCESS_STATUS_CODE).json({ 
                status_code: SUCCESS_STATUS_CODE,
                message: 'New Event Type Added' 
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ 
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });    
    }
});

// PUT API : Update Event Type 
router.put(`${UPDATE_EVENT_THEME_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        theme_name, 
        shop_id,
        event_id,
        theme_id
    } = req.body;
    
    try {
        // Update the product in the database
        const sql = `
            UPDATE ${PSS_EVENT_THEMES}
            SET 
                theme_name = ?       
            WHERE shop_id = ? AND event_id = ? AND theme_id = ?`;
        db.query(sql, [
            theme_name, 
            shop_id,
            event_id,
            theme_id
        ], (err, result) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({ 
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
                message: 'Event Type updated successfully' 
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ 
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// API : Get All Event Types
router.get(`${GET_EVENT_ALLTHEMES_API}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id } = req.params;
      db.query(
        `SELECT * FROM ${PSS_EVENT_THEMES} s WHERE s.shop_id = ?`,
        [shop_id],
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

// API : Get Event themes Types
router.get(`${GET_EVENT_THEMES_API}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id, event_id } = req.params;
      db.query(
        `SELECT * FROM ${PSS_EVENT_THEMES} s WHERE s.shop_id = ? AND s.event_id = ?`,
        [shop_id, event_id],
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

module.exports = router;
