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
    SUCCESS_ADD_ASSIGNEE_MSG,
    PSS_FEEDBACK_REVIEW_TABLE,
} = require("../constants/constant.js");

// POST API : Add New Review Comment
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
        // Insert review comment into the database
        const sql = `
            INSERT INTO ${PSS_FEEDBACK_REVIEW_TABLE} (
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
            console.log(err)
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
        console.log(err)
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR, 
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });    
    }
});

// API : Get All customer reviews
router.get(`${GET_EVENT_ASSIGNEE}`, midlData.verifyToken, (req, res, next) => {
    const { shop_id } = req.query; // Query param to handle shop_id
    if (!shop_id) {
        return res.status(BAD_REQUEST_CODE).json({
            status_code: BAD_REQUEST_CODE,
            error: "Shop ID is required"
        });
    }

    const sql = `SELECT * FROM ${PSS_FEEDBACK_REVIEW_TABLE} s WHERE s.shop_id = ? ORDER BY review_id DESC`;

    db.query(sql, [shop_id], function (error, results) { // Only passing shop_id
        if (error) {
            return res.status(BAD_REQUEST_CODE).send({
                msg: error,
                err: true,
                status_code: BAD_REQUEST_CODE,
                data: []
            });
        }
        if (results.length === 0) {
            return res.status(SUCCESS_STATUS_CODE).send({
                data: [],
                err: false,
                status_code: SUCCESS_STATUS_CODE,
                message: "No reviews found"
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
