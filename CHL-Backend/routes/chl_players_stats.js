const express = require("express");
const router = express.Router();
const {SUCCESS_STATUS_CODE,PLAYERS_STATS_PERTEAM, PLAYERS_STATS_TWOTEAM, MATCH_PLAYERS_STATS, ERROR_STATUS_CODE} = require("../constants/constant.js");
const db = require("../lib/chlDb.js");

// API : Get All team players stats as per series and team id 
router.get(`${PLAYERS_STATS_PERTEAM}`, (req, res, next) => {
  const { teamId, seriesId } = req.params;

    db.query(
        `SELECT team_squad_players.*, player_match_stats.*
        FROM team_squad_players INNER JOIN player_match_stats ON 
        team_squad_players.player_id = player_match_stats.player_id 
        WHERE 
        team_squad_players.team_id = ${teamId}
        AND 
        player_match_stats.team_id = ${teamId}
        AND
        team_squad_players.series_id = ${seriesId}
        AND 
        player_match_stats.series_id = ${seriesId}
        `,
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


// API : Get All team players stats as per series and team id 
router.post(`${PLAYERS_STATS_TWOTEAM}`, (req, res, next) => {
  const requestData = req.body;

    db.query(
        `SELECT team_squad_players.*, player_match_stats.*
        FROM team_squad_players INNER JOIN player_match_stats ON 
        team_squad_players.player_id = player_match_stats.player_id 
        WHERE 
        (team_squad_players.team_id = ${requestData.team1_id} OR team_squad_players.team_id = ${requestData.team2_id})
        AND 
        (player_match_stats.team_id = ${requestData.team1_id} OR team_squad_players.team_id = ${requestData.team2_id})
        AND
        team_squad_players.series_id = ${requestData.series_id}
        AND 
        player_match_stats.series_id = ${requestData.series_id}
        `,
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

// POST API: get series teams list - "/series/squad/list"
router.post(`${MATCH_PLAYERS_STATS}`, (req, res, next) => {
  const paramsArray = req.body; // Expecting an array of { series_id, squad_id }

  // Validate the input
  if (!Array.isArray(paramsArray) || paramsArray.length === 0) {
    return res.status(400).send({
      msg: 'Invalid input, expected an array of { series_id, squad_id }',
      err: true,
      status_code: 400,
    });
  }

  // Create an array of promises for each database query
  const promises = paramsArray.map((param) => {
    const { series_id, match_id } = param;

    // Return a promise for each query
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM player_match_stats WHERE series_id = ? AND match_id = ?`,
        [series_id, match_id],
        (error, results) => {
          if (error) {
            return reject(error);
          }
          // If data is found, return result as true; otherwise, false
          resolve({
            match_id,
            result: results.length > 0, // true if data exists, false otherwise
          });
        }
      );
    });
  });

  // Execute all promises and send the response
  Promise.all(promises)
    .then((results) => {
      return res.status(SUCCESS_STATUS_CODE).send({
        data: results,
        err: false,
        status_code: SUCCESS_STATUS_CODE,
      });
    })
    .catch((error) => {
      return res.status(ERROR_STATUS_CODE).send({
        msg: error.message,
        err: true,
        status_code: ERROR_STATUS_CODE,
      });
    });
});

module.exports = router;
