const express = require("express");
const router = express.Router();
const {
  SUCCESS_STATUS_CODE, 
  DB_QUERY_FAILED_CODE, ERROR_MESSAGES_STATUS_CODE, CHL_PLAYERS_MATCH_STATS, ADD_MATCHES_SCORECARD} = require("../constants/constant.js");
const db = require("../lib/chlDb.js");

// POST API : Add series data into database = "add_series"
router.post(`${ADD_MATCHES_SCORECARD}`, (req, res) => {
  const matches_data = req.body; // Expecting an array of team objects
  // Prepare bulk insert query
  const values = matches_data.map(m => [
    m.team_id,
    m.series_id,
    m.player_id,
    m.match_id,
    m.is_captain,
    m.is_keeper,
    m.match_run != null && m.match_run != '' ? m.match_run : 0,
    m.played_ball != null && m.played_ball != '' ? m.played_ball : 0,
    m.played_dot != null && m.played_dot != '' ? m.played_dot : 0,
    m.total_four != null && m.total_four != '' ? m.total_four : 0,
    m.total_six != null && m.total_six != '' ? m.total_six : 0,
    m.match_strikerate != null && m.match_strikerate != '' ? m.match_strikerate : 0,
    m.lastmatch_batposition,
    m.total_over_bowled != null && m.total_over_bowled != '' ? m.total_over_bowled : 0,
    m.maidens != null && m.maidens != '' ? m.maidens : 0,
    m.given_runs != null && m.given_runs != '' ? m.given_runs : 0,
    m.total_wicket_taken != null && m.total_wicket_taken != '' ? m.total_wicket_taken : 0,
    m.bowling_economy != null && m.bowling_economy != '' ? m.bowling_economy : 0,
    m.total_balls_bowled != null && m.total_balls_bowled != '' ? m.total_balls_bowled : 0
  ]);
  const sql = `
      INSERT INTO ${CHL_PLAYERS_MATCH_STATS} (
        team_id,
        series_id,
        player_id,
        match_id,
        is_captain,
        is_keeper,
        match_run,
        played_ball,
        played_dot,
        total_four,
        total_six,
        match_strikerate,
        lastmatch_batposition,
        total_over_bowled,
        maidens,
        given_runs,
        total_wicket_taken,
        bowling_economy,
        total_balls_bowled
        )
    VALUES ?`;

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
          message: 'MAtches scorecard inserted successfully', 
          data: result,
          err: false,
          status_code: SUCCESS_STATUS_CODE
      });
  });
});

module.exports = router;
