const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const midlData = require('../middleware/token_interpreter.js');

const {  
    BAD_REQUEST_CODE, 
    ERROR_MESSAGES_STATUS_CODE, 
    SUCCESS_STATUS_CODE, 
    INTERNAL_SERVER_ERROR, 
    ADD_ASSIGNEE_API,
    UPDATE_ASSIGNEE_API,
    GET_EVENT_ASSIGNEE,
    PSS_EVENT_ASSIGNEES,
    GET_ALL_ASSIGNEE,
    SUCCESS_ADD_ASSIGNEE_MSG,
    SUCCESS_UPDATE_ASSIGNEE_MSG,
    DELETE_ASSIGNEE_API,
    SUCCESS_DELETE_ASSIGNEE_MSG
} = require("../constants/constant.js");

// POST API : Add New Event Type
router.post(`${ADD_ASSIGNEE_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        assignee_name,
        mobile_number,
        shop_id
    } = req.body;
    
    try {
        // Insert the user into the database
        const sql = `
            INSERT INTO ${PSS_EVENT_ASSIGNEES} (
                assignee_name, 
                mobile_number,
                shop_id
            )
            VALUES (?, ?, ?)`;

        db.query(sql, [
            assignee_name,
            mobile_number, 
            shop_id
        ], (err, result) => {
          console.log(err);
          console.log(result)
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({ 
                    status_code: BAD_REQUEST_CODE,
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
                });
            }
            res.status(SUCCESS_STATUS_CODE).json({ 
                status_code: SUCCESS_STATUS_CODE,
                message: SUCCESS_ADD_ASSIGNEE_MSG
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
router.put(`${UPDATE_ASSIGNEE_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        assignee_name,
        mobile_number, 
        assignee_id
    } = req.body;
    
    try {
        // Update the product in the database
        const sql = `
            UPDATE ${PSS_EVENT_ASSIGNEES}
            SET 
                assignee_name = ?,
                mobile_number = ?      
            WHERE assignee_id = ?`;
        db.query(sql, [
            assignee_name,
            mobile_number,
            assignee_id
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
                    message: 'Assignee Not Found'
                });
            }
            res.status(SUCCESS_STATUS_CODE).json({ 
                status_code: SUCCESS_STATUS_CODE,
                message: SUCCESS_UPDATE_ASSIGNEE_MSG
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// API : Get Event Assignee
router.get(`${GET_EVENT_ASSIGNEE}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id, event_id } = req.params;
      db.query(
        `SELECT * FROM ${PSS_EVENT_ASSIGNEES} s WHERE s.shop_id = ? AND s.event_id = ? ORDER BY assignee_id DESC`,
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

// API : Get Event Assignee
router.get(`${GET_EVENT_ASSIGNEE}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id, event_id } = req.params;
      db.query(
        `SELECT * FROM ${PSS_EVENT_ASSIGNEES} s WHERE s.shop_id = ? AND s.event_id = ? ORDER BY assignee_id DESC`,
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

// API : Get ALL Assignee
router.get(`${GET_ALL_ASSIGNEE}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id } = req.params;
      db.query(
        `SELECT * FROM ${PSS_EVENT_ASSIGNEES} s WHERE s.shop_id = ? ORDER BY assignee_id DESC`,
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

// DELETE API: Delete Assignee
router.delete(`${DELETE_ASSIGNEE_API}`, midlData.verifyToken, async (req, res) => {
  const { assignee_id } = req.body;

  try {
      // Delete the assignee from the database
      const sql = `
          DELETE FROM ${PSS_EVENT_ASSIGNEES}
          WHERE assignee_id = ?`;
      
      db.query(sql, [assignee_id], (err, result) => {
          if (err) {
              return res.status(BAD_REQUEST_CODE).json({
                  status_code: BAD_REQUEST_CODE,
                  error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE]
              });
          }
          if (result.affectedRows === 0) {
              return res.status(NOT_FOUND_CODE).json({
                  status_code: NOT_FOUND_CODE,
                  message: 'Assignee Not Found'
              });
          }
          res.status(SUCCESS_STATUS_CODE).json({
              status_code: SUCCESS_STATUS_CODE,
              message: SUCCESS_DELETE_ASSIGNEE_MSG
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
