const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const midlData = require('../middleware/token_interpreter.js');

const {  
    BAD_REQUEST_CODE, 
    ERROR_MESSAGES_STATUS_CODE, 
    SUCCESS_STATUS_CODE, 
    INTERNAL_SERVER_ERROR, 
    ADD_EVENT_TYPE_API,
    UPDATE_EVENT_TYPE_API,
    GET_ALL_EVENTS_API,
    PSS_EVENT_TYPE,
    SUCCESS_ADD_EVENT_TYPE_MSG,
    SUCCESS_UPDATE_EVENT_TYPE_MSG,
    GET_ALL_PSS_EVENTS_API,
    PSS_EVENTS_LIST
} = require("../constants/constant.js");

// POST API : Add New Event Type
router.post(`${ADD_EVENT_TYPE_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        event_name,
        shop_id
    } = req.body;
    
    try {
        // Insert the user into the database
        const sql = `
            INSERT INTO ${PSS_EVENT_TYPE} (
                event_name, 
                shop_id
            )
            VALUES (?, ?)`;

        db.query(sql, [
            event_name, 
            shop_id
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

// PUT API : Update Event Type 
router.put(`${UPDATE_EVENT_TYPE_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        event_name, 
        shop_id,
        event_id
    } = req.body;
    
    try {
        // Update the product in the database
        const sql = `
            UPDATE ${PSS_EVENT_TYPE}
            SET 
                event_name = ?
            WHERE shop_id = ? AND event_id = ?`;
        db.query(sql, [
            event_name, 
            shop_id,
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

// API : Get All Event Types for shops
router.get(`${GET_ALL_EVENTS_API}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id } = req.params;
      db.query(
        `SELECT * FROM ${PSS_EVENT_TYPE} s WHERE s.shop_id = ? ORDER BY event_id DESC`,
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

module.exports = router;
