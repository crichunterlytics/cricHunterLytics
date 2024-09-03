const express = require("express");
const router = express.Router();
const { USER_SERIES_LIST, CHL_SERIES, CHL_USER_SERIES, ERROR_STATUS_CODE, SUCCESS_STATUS_CODE, ADD_USER_SERIES_LIST, DB_QUERY_FAILED_CODE, ERROR_MESSAGES_STATUS_CODE } = require("../constants/constant.js");
const db = require("../lib/chlDb.js");

//Get API : Get user series List data  - "user_series_list"
router.get(`${USER_SERIES_LIST}`, (req, res, next) => {
    db.query(`SELECT * FROM ${CHL_SERIES} s JOIN ${CHL_USER_SERIES} us ON s.series_id = us.series_id WHERE us.user_id = 2;`,
      [],
      function (error, results, fields) {
        if (error) {
          return res.status(ERROR_STATUS_CODE).send({
            msg: error,
            err: true,
            status_code: ERROR_STATUS_CODE
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

//POST API : Add User series List - "add_user_series"
router.post(`${ADD_USER_SERIES_LIST}`, (req, res) => {
  const series_data = req.body; // Expecting an array of team objects
  // Prepare bulk insert query
  const values = series_data.map(series => [
      series.seriesId,
      series.userId
  ]);

  const sql = `
      INSERT INTO ${CHL_USER_SERIES} (series_id, user_id) VALUES ?`;
  // Execute the query
  db.query(sql, [values], (err, result) => {
      if (err) {
          console.error('Error executing query: ' + err.stack);
          return res.status(DB_QUERY_FAILED_CODE).json({ 
              error: ERROR_MESSAGES_STATUS_CODE[DB_QUERY_FAILED_CODE]
          });
      }
      return res.status(SUCCESS_STATUS_CODE).json({ 
          message: 'User Series inserted successfully', 
          data: result,
          err: false,
          status_code: SUCCESS_STATUS_CODE
      });
  });
});

module.exports = router;
