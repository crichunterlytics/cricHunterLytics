const express = require("express");
const router = express.Router();
const {
  SUCCESS_STATUS_CODE, 
  SERIES_INDIVIDUAL_MATCH,
  DB_QUERY_FAILED_CODE, ERROR_MESSAGES_STATUS_CODE, SERIES_MATCHES_LIST, CHL_SERIES_MATCHES, ADD_SERIES_MATCHES } = require("../constants/constant.js");
const db = require("../lib/chlDb.js");

// API : Get Available serieses list, No PARAMETER required - 'series_list'
router.get(`${SERIES_MATCHES_LIST}`, (req, res, next) => {
  const { seriesId } = req.params;
    db.query(`SELECT * FROM ${CHL_SERIES_MATCHES} s WHERE s.series_id = ?`,
      [seriesId],
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

// API : Get Individual Match Details, No PARAMETER required - 'series_list'
router.get(`${SERIES_INDIVIDUAL_MATCH}`, (req, res, next) => {
  const { seriesId, matchId} = req.params;
    db.query(`SELECT * FROM ${CHL_SERIES_MATCHES} s WHERE s.series_id = ? AND s.match_id = ?`,
      [seriesId, matchId],
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

// POST API : Add series data into database = "add_series"
router.post(`${ADD_SERIES_MATCHES}`, (req, res) => {
  const matches_data = req.body; // Expecting an array of team objects
  // Prepare bulk insert query
  const values = matches_data.map(m => [
    m.series_id,
    m.match_id,
    m.date_display_text,
    m.match_number_text,
    m.match_format,
    m.start_date,
    m.end_date,
    m.team1_id,
    m.team1_name,
    m.team1_shortname,
    m.team1_imageid,
    m.team2_id,
    m.team2_name,
    m.team2_shortname,
    m.team2_imageid,
    m.ground_id,
    m.ground_name,
    m.ground_city,
    m.team1_image_url,
    m.team2_image_url,
    m.match_result_text,
    m.match_status
  ]);
  const sql = `
      INSERT INTO ${CHL_SERIES_MATCHES} (series_id, match_id, date_display_text, match_number_text, match_format, start_date, end_date, team1_id, team1_name, team1_shortname, team1_imageid, team2_id, team2_name, team2_shortname, team2_imageid, ground_id, ground_name, ground_city, team1_image_url, team2_image_url, match_result_text, match_status) 
      VALUES ?
      ON DUPLICATE KEY UPDATE series_id = series_id AND match_id = match_id;
      `;

  // Execute the query
  db.query(sql, [values], (err, result) => {
    console.log("err:", err);
    console.log("result=",result);
      if (err) {
          return res.status(DB_QUERY_FAILED_CODE).json({ 
              error: ERROR_MESSAGES_STATUS_CODE[DB_QUERY_FAILED_CODE] 
          });
      }
      return res.status(SUCCESS_STATUS_CODE).json({ 
          message: 'MAtches inserted successfully', 
          data: result,
          err: false,
          status_code: SUCCESS_STATUS_CODE
      });
  });
});

module.exports = router;
