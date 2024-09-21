const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const midlData = require('../middleware/token_interpreter.js');

const {  
    BAD_REQUEST_CODE, 
    ERROR_MESSAGES_STATUS_CODE, 
    SUCCESS_STATUS_CODE, 
    INTERNAL_SERVER_ERROR, 
    ADD_CUSTOMER_API,
    UPDATE_CUSTOMER_API,
    PSS_EVENT_CUSTOMERS,
    UPDATE_EVENT_STATUS_API,
    UPDATE_EVENT_ASSIGNEE_API,
    GET_ALL_CUSTOMER_API,
    GET_ALL_UPCOMING_EVENT_API,
    GET_EVENT_CUSTOMER_API,
    GET_EVENT_THEME_CUSTOMER_API,
    GET_EVENT_UPCOMING_EVENT_API,
    SUCCESS_ADD_CUSTOMER_MSG,
    SUCCESS_UPDATE_CUSTOMER_MSG,
    SUCCESS_UPDATE_CUSTOMER_STATUS_MSG,
    SUCCESS_UPDATE_CUSTOMER_ASSIGNEE_MSG
} = require("../constants/constant.js");

// POST API : Add New Event Type
router.post(`${ADD_CUSTOMER_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        customer_name,
        customer_number,
        event_address,
        shop_id,
        event_id,
        event_name,
        theme_id,
        theme_name,
        total_amount,
        advance_amount,
        remaining_amount,
        event_description,
        event_datetime,
        event_status
    } = req.body;
    
    try {
        // Insert the user into the database
        const sql = `
            INSERT INTO ${PSS_EVENT_CUSTOMERS} (
              customer_name,
              customer_number,
              event_address,
              shop_id,
              event_id,
              event_name,
              theme_id,
              theme_name,
              total_amount,
              advance_amount,
              remaining_amount,
              event_description,
              event_datetime,
              event_status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [
          customer_name,
          customer_number,
          event_address,
          shop_id,
          event_id,
          event_name,
          theme_id,
          theme_name,
          total_amount,
          advance_amount,
          remaining_amount,
          event_description,
          event_datetime,
          event_status
        ], (err, result) => {
          console.log(err);
          console.log(result)
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({ 
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE],
                    status_code: BAD_REQUEST_CODE
                });
            }
            res.status(SUCCESS_STATUS_CODE).json({ 
                status_code: SUCCESS_STATUS_CODE,
                message: SUCCESS_ADD_CUSTOMER_MSG
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR],
            status_code: INTERNAL_SERVER_ERROR
        });    
    }
});

// PUT API : Update Event Type 
router.put(`${UPDATE_CUSTOMER_API}`, midlData.verifyToken, async (req, res) => {
    const { 
      customer_name,
      customer_number,
      event_address,
      shop_id,
      event_id,
      event_name,
      theme_id,
      theme_name,
      total_amount,
      advance_amount,
      remaining_amount,
      event_description,
      event_datetime,
      event_status,
      customer_id
    } = req.body;
    
    try {
        // Update the product in the database
        const sql = `
            UPDATE ${PSS_EVENT_CUSTOMERS}
            SET 
            customer_name = ?,
            customer_number = ?,
            event_address = ?,
            event_id = ?,
            event_name = ?,
            theme_id = ?,
            theme_name = ?,
            total_amount = ?,
            advance_amount = ?,
            remaining_amount = ?,
            event_description = ?,
            event_datetime = ?,
            event_status = ?      
            WHERE shop_id = ? AND customer_id = ?`;
        db.query(sql, [
          customer_name,
          customer_number,
          event_address,
          event_id,
          event_name,
          theme_id,
          theme_name,
          total_amount,
          advance_amount,
          remaining_amount,
          event_description,
          event_datetime,
          event_status,
          shop_id,
          customer_id
        ], (err, result) => {
            if (err) {
                return res.status(BAD_REQUEST_CODE).json({ 
                    error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE],
                    status_code: BAD_REQUEST_CODE
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
                message: SUCCESS_UPDATE_CUSTOMER_MSG 
            });
        });
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({ 
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR],
            status_code: INTERNAL_SERVER_ERROR
        });
    }
});

// PUT API : Update Event Type 
router.put(`${UPDATE_EVENT_STATUS_API}`, midlData.verifyToken, async (req, res) => {
  const { 
    event_status,
    shop_id,
    event_id,
    customer_id
  } = req.body;
  
  try {
      // Update the product in the database
      const sql = `
          UPDATE ${PSS_EVENT_CUSTOMERS}
          SET event_status = ?
          WHERE shop_id = ? AND event_id = ? AND customer_id = ?`;
      db.query(sql, [
        event_status,
        shop_id,
        event_id,
        customer_id
      ], (err, result) => {
        console.log(err)
          if (err) {
              return res.status(BAD_REQUEST_CODE).json({ 
                  error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE],
                  status_code: BAD_REQUEST_CODE
              });
          }
          if (result.affectedRows === 0) {
              return res.status(NOT_FOUND_CODE).json({
                  status_code: NOT_FOUND_CODE,
                  message: 'Event Status Not Found'
              });
          }
          res.status(SUCCESS_STATUS_CODE).json({ 
              status_code: SUCCESS_STATUS_CODE,
              message: SUCCESS_UPDATE_CUSTOMER_STATUS_MSG
          });
      });
  } catch (err) {
      res.status(INTERNAL_SERVER_ERROR).json({ 
          error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR],
          status_code: INTERNAL_SERVER_ERROR
      });
  }
});

// PUT API : Update Event Type 
router.put(`${UPDATE_EVENT_ASSIGNEE_API}`, midlData.verifyToken, async (req, res) => {
  const {
    assignee_name,
    assignee_id,
    assignee_mobile_number,
    shop_id,
    event_id,
    customer_id
  } = req.body;
  
  try {
      // Update the product in the database
      const sql = `
          UPDATE ${PSS_EVENT_CUSTOMERS}
          SET
          assignee_name = ?,
          assignee_id = ?,
          assignee_mobile_number = ?
          WHERE shop_id = ? AND event_id = ? AND customer_id = ?`;
      db.query(sql, [
        assignee_name,
        assignee_id,
        assignee_mobile_number,
        shop_id,
        event_id,
        customer_id
      ], (err, result) => {
        console.log(err)
          if (err) {
              return res.status(BAD_REQUEST_CODE).json({ 
                  error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE],
                  status_code: BAD_REQUEST_CODE
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
              message: SUCCESS_UPDATE_CUSTOMER_ASSIGNEE_MSG
          });
      });
  } catch (err) {
      res.status(INTERNAL_SERVER_ERROR).json({ 
          error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR],
          status_code: INTERNAL_SERVER_ERROR
      });
  }
});


// API : Get Event Assignee
router.get(`${GET_ALL_CUSTOMER_API}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id } = req.params;
      db.query(
        `SELECT * FROM ${PSS_EVENT_CUSTOMERS} s WHERE s.shop_id = ? ORDER BY customer_id DESC`,
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

router.get(`${GET_EVENT_CUSTOMER_API}`, midlData.verifyToken, (req, res, next) => {
  const { shop_id, event_id } = req.params;
    db.query(
      `SELECT * FROM ${PSS_EVENT_CUSTOMERS} s WHERE s.shop_id = ? AND s.event_id=? ORDER BY customer_id DESC`,
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

router.get(`${GET_EVENT_THEME_CUSTOMER_API}`, midlData.verifyToken, (req, res, next) => {
  const { shop_id, event_id, theme_id } = req.params;
    db.query(
      `SELECT * FROM ${PSS_EVENT_CUSTOMERS} s WHERE s.shop_id = ? AND s.event_id = ? AND theme_id = ? ORDER BY customer_id DESC`,
      [shop_id, event_id, theme_id],
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

router.get(`${GET_ALL_UPCOMING_EVENT_API}`, midlData.verifyToken, (req, res, next) => {
  const { shop_id, event_status_list} = req.params;
  let sqlQuery = '';
  if(event_status_list === 'old_events') {
    sqlQuery = `SELECT * 
       FROM ${PSS_EVENT_CUSTOMERS} s 
       WHERE s.shop_id = ? 
       AND DATE(FROM_UNIXTIME(s.event_datetime / 1000)) < CURDATE() 
       ORDER BY s.customer_id DESC`;
  }
  else {
    sqlQuery = `SELECT * 
    FROM ${PSS_EVENT_CUSTOMERS} s 
    WHERE s.shop_id = ? 
    AND s.event_status = 'next_coming' 
    AND (DATE(FROM_UNIXTIME(s.event_datetime / 1000)) = CURDATE() 
        OR DATE(FROM_UNIXTIME(s.event_datetime / 1000)) = CURDATE() + INTERVAL 1 DAY 
        OR DATE(FROM_UNIXTIME(s.event_datetime / 1000)) = CURDATE() + INTERVAL 2 DAY) ORDER BY customer_id DESC`;
  }

  db.query(
    sqlQuery,
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

router.get(`${GET_EVENT_UPCOMING_EVENT_API}`, midlData.verifyToken, (req, res, next) => {
  const { shop_id, event_id } = req.params;

  db.query(
    `SELECT * 
     FROM ${PSS_EVENT_CUSTOMERS} s 
     WHERE s.shop_id = ? 
     AND s.event_id = ? 
     AND s.event_status = 'next_coming' 
     AND (DATE(s.event_datetime) = CURDATE() 
         OR DATE(s.event_datetime) = CURDATE() + INTERVAL 1 DAY 
         OR DATE(s.event_datetime) = CURDATE() + INTERVAL 2 DAY) ORDER BY customer_id DESC`,
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
