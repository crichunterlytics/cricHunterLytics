const express = require("express");
const router = express.Router();
const {
  CHL_SERIES, 
  SERIES_LIST, 
  SUCCESS_STATUS_CODE, 
  ADD_SERIES, 
  DB_QUERY_FAILED_CODE, ERROR_MESSAGES_STATUS_CODE } = require("../constants/constant.js");
const db = require("../lib/chlDb.js");

// API : Get Available serieses list, No PARAMETER required - 'series_list'
router.get(`${SERIES_LIST}`, (req, res, next) => {
  const { seriesType } = req.params;
    db.query(`SELECT * FROM ${CHL_SERIES} s WHERE s.series_type = ?`,
      [seriesType],
      function (error, results, fields) {
        if (error) {
          throw error;
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

// POST API : Add series data into database = "add_series"
router.post(`${ADD_SERIES}`, (req, res) => {
  const series_data = req.body; // Expecting an array of team objects
  // Prepare bulk insert query
  const values = series_data.map(series => [
      series.seriesId,
      series.series_name,
      series.startDt,
      series.endDt,
      series.seriesType,
      series.dateHeaderText
  ]);

  const sql = `
      INSERT INTO ${CHL_SERIES} (series_id, series_name, start_date, end_date, series_type, series_header_text) 
      VALUES ?`;

  // Execute the query
  db.query(sql, [values], (err, result) => {
      if (err) {
          return res.status(DB_QUERY_FAILED_CODE).json({ 
              error: ERROR_MESSAGES_STATUS_CODE[DB_QUERY_FAILED_CODE] 
          });
      }
      return res.status(SUCCESS_STATUS_CODE).json({ 
          message: 'Series inserted successfully', 
          data: result,
          err: false,
          status_code: SUCCESS_STATUS_CODE
      });
  });
});

module.exports = router;
