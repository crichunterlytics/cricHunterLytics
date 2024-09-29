const express = require("express");
const router = express.Router();
const midlData = require('../middleware/token_interpreter.js');
const { executeQuery } = require("../utils/executeQuery.js");

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
    SUCCESS_UPDATE_ASSIGNEE_MSG
} = require("../constants/constant.js");

// POST API : Add New Event Type
router.post(`${ADD_ASSIGNEE_API}`, midlData.verifyToken, async (req, res) => {
    const { 
        assignee_name,
        mobile_number,
        shop_id
    } = req.body;
    
    try {
        const sql = `
            INSERT INTO ${PSS_EVENT_ASSIGNEES} (
                assignee_name, 
                mobile_number,
                shop_id
            )
            VALUES (?, ?, ?)`;

        const result = await executeQuery(sql, [assignee_name, mobile_number, shop_id]);

        res.status(SUCCESS_STATUS_CODE).json({ 
            status_code: SUCCESS_STATUS_CODE,
            message: SUCCESS_ADD_ASSIGNEE_MSG
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
        shop_id
    } = req.body;
    
    try {
        const sql = `
            UPDATE ${PSS_EVENT_ASSIGNEES}
            SET 
                assignee_name = ?,
                mobile_number = ?      
            WHERE shop_id = ?`;
        const result = await executeQuery(sql, [assignee_name, mobile_number, shop_id]);

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
    } catch (err) {
        res.status(INTERNAL_SERVER_ERROR).json({
            status_code: INTERNAL_SERVER_ERROR,
            error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR]
        });
    }
});

// API : Get Event Assignee
router.get(`${GET_EVENT_ASSIGNEE}`, midlData.verifyToken, async (req, res, next) => {
    const { shop_id, event_id } = req.params;
    
    try {
        const sql = `
            SELECT * FROM ${PSS_EVENT_ASSIGNEES} 
            WHERE shop_id = ? AND event_id = ? 
            ORDER BY assignee_id DESC`;
        
        const results = await executeQuery(sql, [shop_id, event_id]);
        
        res.status(SUCCESS_STATUS_CODE).send({
            data: results,
            err: false,
            status_code: SUCCESS_STATUS_CODE
        });
    } catch (error) {
        res.status(BAD_REQUEST_CODE).send({
            msg: error,
            err: true,
            status_code: BAD_REQUEST_CODE,
            data: []
        });
    }
});

// API : Get ALL Assignee
router.get(`${GET_ALL_ASSIGNEE}`, midlData.verifyToken, async (req, res, next) => {
    const { shop_id } = req.params;
    
    try {
        const sql = `
            SELECT * FROM ${PSS_EVENT_ASSIGNEES} 
            WHERE shop_id = ? 
            ORDER BY assignee_id DESC`;
        
        const results = await executeQuery(sql, [shop_id]);
        
        res.status(SUCCESS_STATUS_CODE).send({
            data: results,
            err: false,
            status_code: SUCCESS_STATUS_CODE
        });
    } catch (error) {
        res.status(BAD_REQUEST_CODE).send({
            msg: error,
            err: true,
            status_code: BAD_REQUEST_CODE,
            data: []
        });
    }
});

module.exports = router;
