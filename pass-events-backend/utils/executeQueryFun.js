const { BAD_REQUEST_CODE, ERROR_MESSAGES_STATUS_CODE, SUCCESS_STATUS_CODE, INTERNAL_SERVER_ERROR } = require("../constants/constant.js");
const db = require("../lib/db.js");

// Helper function for database operations
const executeQuery = (sql, params, res, successMessage) => {
    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) {
          return res.status(BAD_REQUEST_CODE).json({
            error: ERROR_MESSAGES_STATUS_CODE[BAD_REQUEST_CODE],
            status_code: BAD_REQUEST_CODE
          });
        }
        resolve(result);
      });
    }).then(result => {
      if (result.affectedRows === 0) {
        return res.status(BAD_REQUEST_CODE).json({
          status_code: BAD_REQUEST_CODE,
          message: 'No record found',
        });
      }
      return res.status(SUCCESS_STATUS_CODE).json({
        status_code: SUCCESS_STATUS_CODE,
        message: successMessage,
        data: result
      });
    }).catch(err => {
      res.status(INTERNAL_SERVER_ERROR).json({
        error: ERROR_MESSAGES_STATUS_CODE[INTERNAL_SERVER_ERROR],
        status_code: INTERNAL_SERVER_ERROR,
      });
    });
  };
  
  module.exports = {
    executeQuery
  };
