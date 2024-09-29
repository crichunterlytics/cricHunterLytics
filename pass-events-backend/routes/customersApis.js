const express = require("express");
const router = express.Router();
const midlData = require('../middleware/token_interpreter.js');
const {
  BAD_REQUEST_CODE,
  SUCCESS_MESSAGES,
  SQL_QUERIES,
  ADD_CUSTOMER_API,
  UPDATE_CUSTOMER_API,
  UPDATE_EVENT_STATUS_API,
  UPDATE_EVENT_PAYMENTS_API,
  UPDATE_EVENT_ASSIGNEE_API,
  GET_ALL_CUSTOMER_API,
  GET_EVENT_CUSTOMER_API,
  GET_EVENT_THEME_CUSTOMER_API,
  GET_ALL_UPCOMING_EVENT_API,
  GET_INDIVIDUAL_CUSTOMER_EVENT,
  GET_CUSTOMER_EVENTS_API,
  PSS_EVENT_CUSTOMERS,
} = require("../constants/constant.js");
const { executeQuery } = require("../utils/executeQueryFun.js");

// POST API : Add New Customer
router.post(ADD_CUSTOMER_API, midlData.verifyToken, async (req, res) => {
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
    loyalty_amount = 0,
  } = req.body;

    // Insert the user into the database
    const sql = 
    `INSERT INTO ${PSS_EVENT_CUSTOMERS} (
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
      loyalty_amount
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  await executeQuery(sql, [
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
    loyalty_amount,
  ], res, SUCCESS_MESSAGES.ADD_CUSTOMER);
});

// PUT API : Update Customer
router.put(UPDATE_CUSTOMER_API, midlData.verifyToken, async (req, res) => {
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
    loyalty_amount,
    customer_id,
  } = req.body;

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
    event_status = ?,
    loyalty_amount = ?
  WHERE shop_id = ? AND customer_id = ?`;
  
  await executeQuery(sql, [
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
    loyalty_amount,
    shop_id,
    customer_id,
  ], res, SUCCESS_MESSAGES.UPDATE_CUSTOMER);
});

// PUT API : Update Event Status
router.put(UPDATE_EVENT_STATUS_API, midlData.verifyToken, async (req, res) => {
  const { event_status, shop_id, event_id, customer_id } = req.body;
  const sql = `UPDATE ${PSS_EVENT_CUSTOMERS}
  SET event_status = ?
  WHERE shop_id = ? AND event_id = ? AND customer_id = ?`;

  await executeQuery(sql, [event_status, shop_id, event_id, customer_id], res, SUCCESS_MESSAGES.UPDATE_EVENT_STATUS);
});

// PUT API : Update Payments
router.put(UPDATE_EVENT_PAYMENTS_API, midlData.verifyToken, async (req, res) => {
  const { total_amount, advance_amount, remaining_amount, shop_id, event_id, customer_id } = req.body;
  const sql = `UPDATE ${PSS_EVENT_CUSTOMERS}
  SET 
    total_amount = ?,
    advance_amount = ?,
    remaining_amount = ?
  WHERE shop_id = ? AND event_id = ? AND customer_id = ?`;

  await executeQuery(sql, [total_amount, advance_amount, remaining_amount, shop_id, event_id, customer_id], res, SUCCESS_MESSAGES.UPDATE_PAYMENTS);
});

// PUT API : Update Event Assignee
router.put(UPDATE_EVENT_ASSIGNEE_API, midlData.verifyToken, async (req, res) => {
  const { assignee_name, assignee_id, assignee_mobile_number, shop_id, event_id, customer_id } = req.body;
  const sql = `
  UPDATE ${PSS_EVENT_CUSTOMERS}
  SET
    assignee_name = ?,
    assignee_id = ?,
    assignee_mobile_number = ?
  WHERE shop_id = ? AND event_id = ? AND customer_id = ?`;

  await executeQuery(sql, [assignee_name, assignee_id, assignee_mobile_number, shop_id, event_id, customer_id], res, SUCCESS_MESSAGES.UPDATE_ASSIGNEE);
});

// GET API : Get All Customers
router.get(GET_ALL_CUSTOMER_API, midlData.verifyToken, async (req, res) => {
  const { shop_id } = req.params;
  const sql = `
  SELECT * FROM ${PSS_EVENT_CUSTOMERS}
  WHERE shop_id = ?
  ORDER BY customer_id DESC`;

  await executeQuery(sql, [shop_id], res, SUCCESS_MESSAGES.FETCH_ALL_CUSTOMERS);
});

// GET API : Get Customers by Event
router.get(GET_EVENT_CUSTOMER_API, midlData.verifyToken, async (req, res) => {
  const { shop_id, event_id } = req.params;
  const sql = `
  SELECT * FROM ${PSS_EVENT_CUSTOMERS}
  WHERE shop_id = ? AND event_id = ?
  ORDER BY customer_id DESC`;

  await executeQuery(sql, [shop_id, event_id], res, SUCCESS_MESSAGES.FETCH_EVENT_CUSTOMERS);
});

// GET API : Get Customers by Event and Theme
router.get(GET_EVENT_THEME_CUSTOMER_API, midlData.verifyToken, async (req, res) => {
  const { shop_id, event_id, theme_id } = req.params;
  const sql = `
  SELECT * FROM ${PSS_EVENT_CUSTOMERS}
  WHERE shop_id = ? AND event_id = ? AND theme_id = ?
  ORDER BY customer_id DESC`;

  await executeQuery(sql, [shop_id, event_id, theme_id], res, SUCCESS_MESSAGES.FETCH_THEME_CUSTOMERS);
});

// GET API : Get Upcoming Events
router.get(GET_ALL_UPCOMING_EVENT_API, midlData.verifyToken, async (req, res) => {
  const { shop_id, event_status_list } = req.params;
  let sqlQuery = '';
  if (event_status_list === 'old_events') {
    // Get past events including today's that occurred earlier than the current time
    sqlQuery = `SELECT * 
       FROM ${PSS_EVENT_CUSTOMERS} s 
       WHERE s.shop_id = ? 
       AND (DATE(FROM_UNIXTIME(s.event_datetime / 1000)) < CURDATE() 
       OR (DATE(FROM_UNIXTIME(s.event_datetime / 1000)) = CURDATE() 
           AND TIME(FROM_UNIXTIME(s.event_datetime / 1000)) < CURTIME())) 
       ORDER BY s.customer_id DESC`;
  } else {
    // Get upcoming events for the next 20 days, including today's upcoming events
    sqlQuery = `SELECT * 
       FROM ${PSS_EVENT_CUSTOMERS} s 
       WHERE s.shop_id = ? 
       AND s.event_status = 'next_coming' 
       AND (DATE(FROM_UNIXTIME(s.event_datetime / 1000)) BETWEEN CURDATE() AND CURDATE() + INTERVAL 20 DAY) 
       ORDER BY s.customer_id DESC`;
  }
  await executeQuery(sqlQuery, [shop_id], res, SUCCESS_MESSAGES.FETCH_UPCOMING_EVENTS);
});

// GET API : Get Individual Customer Details
router.get(GET_INDIVIDUAL_CUSTOMER_EVENT, midlData.verifyToken, async (req, res) => {
  const { shop_id, customer_id } = req.params;
  const sql = `SELECT * FROM ${PSS_EVENT_CUSTOMERS} s WHERE s.shop_id = ? AND s.customer_id = ?`;

  await executeQuery(sql, [shop_id, customer_id], res, SUCCESS_MESSAGES.FETCH_CUSTOMER_DETAILS);
});

// GET API : Get Customer Events by Status
router.get(GET_CUSTOMER_EVENTS_API, midlData.verifyToken, async (req, res) => {
  const { shop_id, event_status } = req.query;

  if (!shop_id) {
    return res.status(BAD_REQUEST_CODE).json({
      status_code: BAD_REQUEST_CODE,
      error: "Shop ID is required"
    });
  }

  let sql = `SELECT * FROM ${PSS_EVENT_CUSTOMERS} s WHERE s.shop_id = ?`;
  
  const params = [shop_id];
  if (event_status) {
    sql += ` AND event_status = ?`;
    params.push(event_status);
  }

  await executeQuery(sql, params, res, SUCCESS_MESSAGES.FETCH_CUSTOMER_EVENTS);
});

module.exports = router;
