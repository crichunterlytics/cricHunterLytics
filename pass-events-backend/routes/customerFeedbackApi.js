const express = require("express");
const router = express.Router();
const db = require("../lib/db.js");
const midlData = require('../middleware/token_interpreter.js');

const {  
    BAD_REQUEST_CODE, 
    ERROR_MESSAGES_STATUS_CODE, 
    SUCCESS_STATUS_CODE, 
    INTERNAL_SERVER_ERROR, 
    ADD_REVIEW_COMMENT_API,
    GET_EVENT_ASSIGNEE,
    GET_ALL_REVIEWS,
    SUCCESS_ADD_ASSIGNEE_MSG,
} = require("../constants/constant.js");

// POST API : Add New Event Type
router.post(`${ADD_REVIEW_COMMENT_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        event_id,
        event_name,
        customer_name,
        customer_id,
        assignee_name,
        assignee_id,
        event_rating,
        assignee_rating,
        review_comment,
        shop_id
    } = req.body;
    
    try {
        // Insert the user into the database
        const sql = `
            INSERT INTO ${GET_ALL_REVIEWS} (
                event_id,
                event_name,
                customer_name,
                customer_id,
                assignee_name,
                assignee_id,
                event_rating,
                assignee_rating,
                review_comment,
                shop_id
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.query(sql, [
            event_id,
            event_name,
            customer_name,
            customer_id,
            assignee_name,
            assignee_id,
            event_rating,
            assignee_rating,
            review_comment,
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

// API : Get All customer reviews
router.get(`${GET_EVENT_ASSIGNEE}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id } = req.query;
      db.query(
        `SELECT * FROM ${GET_ALL_REVIEWS} s WHERE s.shop_id = ? ORDER BY review_id DESC`,
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
