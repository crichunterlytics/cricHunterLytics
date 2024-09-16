const express = require("express");
const router = express.Router();
const {
  CHL_SERIES, 
  SERIES_LIST, 
  SUCCESS_STATUS_CODE, 
  ADD_SERIES, 
  DB_QUERY_FAILED_CODE, ERROR_MESSAGES_STATUS_CODE, SERIES_LIST_NOT_CONTENT_ADDED, SERIES_LIST_NOT_MATCHES_ADDED, SERIES_LIST_NOT_TEAMS_ADDED, SERIES_LIST_NOT_SQUAD_ADDED, ERROR_STATUS_CODE } = require("../constants/constant.js");
const db = require("../lib/chlDb.js");

// API : Get Available serieses list, No PARAMETER required - 'series_list'
router.get(`${SERIES_LIST}`, (req, res, next) => {
  const { seriesType } = req.params;
    db.query(
      // `SELECT * FROM ${CHL_SERIES} s WHERE s.series_type = ?`,
      `SELECT * FROM ${CHL_SERIES} s WHERE s.series_type = ?
      AND ((CURDATE() BETWEEN FROM_UNIXTIME(s.start_date / 1000) AND FROM_UNIXTIME(s.end_date / 1000))
      OR (CURDATE() < FROM_UNIXTIME(s.start_date / 1000)))
      AND s.is_series_matches = 1
      AND s.is_series_teams = 1
      AND s.is_series_teams_squad = 1;`,
      [seriesType],
      function (error, results, fields) {
        if (error) {
          return res.status(ERROR_STATUS_CODE).send({
            msg: error,
            err: true,
            status_code: ERROR_STATUS_CODE,
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

// API : Get Series Which Series Matches not added yet'
router.get(`${SERIES_LIST_NOT_CONTENT_ADDED}`, (req, res, next) => {
  const { contentType } = req.params;
  let cntType = '';
  if(contentType === SERIES_LIST_NOT_MATCHES_ADDED) {
    cntType = 'is_series_matches'
  }
  else if(contentType === SERIES_LIST_NOT_TEAMS_ADDED) {
    cntType = 'is_series_teams'
  }
  else if(contentType === SERIES_LIST_NOT_SQUAD_ADDED) {
    cntType = 'is_series_teams_squad'
  }
  else {
    return res.status(ERROR_STATUS_CODE).send({
      data: [],
      err: true,
      status_code: ERROR_STATUS_CODE
    });
  }

    db.query(
      // `SELECT * FROM ${CHL_SERIES} s WHERE s.series_type = ?`,
      `SELECT * FROM ${CHL_SERIES} s WHERE s.${cntType} = 0;`,
      [],
      function (error, results, fields) {
        if (error) {
          return res.status(ERROR_STATUS_CODE).send({
            msg: error,
            err: true,
            status_code: ERROR_STATUS_CODE,
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
      series.dateHeaderText,
      series.is_series_matches,
      series.is_series_teams,
      series.is_series_teams_squad
  ]);
  
  // const sql = `
  // INSERT INTO ${CHL_SERIES} (series_id, series_name, start_date, end_date, series_type, series_header_text, is_series_matches, is_series_teams, is_series_teams_squad) 
  // VALUES ? 
  // ON DUPLICATE KEY UPDATE series_id = series_id;`;
  const sql = `
  INSERT INTO ${CHL_SERIES} 
    (series_id, series_name, start_date, end_date, series_type, series_header_text, is_series_matches, is_series_teams, is_series_teams_squad) 
  VALUES ? 
  ON DUPLICATE KEY UPDATE 
    series_name = VALUES(series_name),
    start_date = VALUES(start_date),
    end_date = VALUES(end_date),
    series_type = VALUES(series_type),
    series_header_text = VALUES(series_header_text),
    is_series_matches = VALUES(is_series_matches),
    is_series_teams = VALUES(is_series_teams),
    is_series_teams_squad = VALUES(is_series_teams_squad);`;

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
