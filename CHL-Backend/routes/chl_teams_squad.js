const express = require("express");
const router = express.Router();
const { SUCCESS_STATUS_CODE, ERROR_STATUS_CODE, DB_QUERY_FAILED_CODE, ERROR_MESSAGES_STATUS_CODE, TEAMS_SQUAD_LIST, CHL_TEAM_SQUAD, ADD_TEAMS_SQUAD } = require("../constants/constant.js");
const db = require("../lib/chlDb.js");

//GET API : get series teams list - "/series/:seriesId/squad/:squadId"
router.get(`${TEAMS_SQUAD_LIST}`, (req, res, next) => {
    const { seriesId, squadId } = req.params;
    db.query(`SELECT * FROM ${CHL_TEAM_SQUAD} t WHERE t.series_id = ? AND t.squad_id = ?`,
      [seriesId, squadId],
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

// POST API to insert bulk data - "add_teams"
router.post(`${ADD_TEAMS_SQUAD}`, (req, res) => {
    const teams = req.body; // Expecting an array of team objects
    // Prepare bulk insert query
    const values = teams.map(team => [
        team.teamId,
        team.seriesId,
        team.squadId,
        team.playerId,
        team.playerName,
        team.playerRole ? team.playerRole : 'Batter',
        team.playerImageId ? team.playerImageId : 0,
        team.playerBatStyle ? team.playerBatStyle : '',
        team.playerBowlStyle ? team.playerBowlStyle : ''
    ]);

    const sql = `INSERT INTO ${CHL_TEAM_SQUAD} (
        team_id, series_id, squad_id, player_id,
        player_name, player_role, player_image_id, 
        player_bat_style, player_bowl_style
        ) VALUES ?`;

    // Execute the query
    db.query(sql, [values], (err, result) => {
        if (err) {
            return res.status(DB_QUERY_FAILED_CODE).json({ 
                error: ERROR_MESSAGES_STATUS_CODE[DB_QUERY_FAILED_CODE]
            });
        }
        return res.status(SUCCESS_STATUS_CODE).json({ 
            message: 'Teams Squad inserted successfully', 
            data: result,
            err: false,
            status_code: SUCCESS_STATUS_CODE
        });
    });
});

module.exports = router;
