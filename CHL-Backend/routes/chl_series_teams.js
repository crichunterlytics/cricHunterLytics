const express = require("express");
const router = express.Router();
const { SERIES_TEAMS_LIST, CHL_SERIES_TEAMS, SUCCESS_STATUS_CODE, ERROR_STATUS_CODE, ADD_SERIES_TEAMS_LIST, DB_QUERY_FAILED_CODE, ERROR_MESSAGES_STATUS_CODE } = require("../constants/constant.js");
const db = require("../lib/chlDb.js");

//GET API : get series teams list - "teams_list"
router.get(`${SERIES_TEAMS_LIST}`, (req, res, next) => {
  const { seriesId } = req.params;
  console.log("seriesID=", seriesId);
    db.query(`SELECT * FROM ${CHL_SERIES_TEAMS} s WHERE s.series_id = ?`,
      [seriesId],
      function (error, results, fields) {
        console.log(error);
        console.log(results)
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

// POST API to insert bulk data - "add_teams"
router.post(`${ADD_SERIES_TEAMS_LIST}`, (req, res) => {
    const teams = req.body; // Expecting an array of team objects
    // Prepare bulk insert query
    const values = teams.map(team => [
        team.teamId,
        team.team_name,
        team.imageId,
        team.squadId,
        team.seriesId,
        team.team_image_url ? team.team_image_url : "",
        team.team_shortname ? team.team_shortname : ""
    ]);

    const sql = `INSERT INTO ${CHL_SERIES_TEAMS} (
      team_id, team_name, image_id, squad_id, series_id, team_image_url, team_shortname) VALUES ?
      ON DUPLICATE KEY UPDATE series_id = series_id AND team_id = team_id;
      `;

    // Execute the query
    db.query(sql, [values], (err, result) => {
      console.log(err);
      console.log(result)
        if (err) {
            return res.status(DB_QUERY_FAILED_CODE).json({ 
                error: ERROR_MESSAGES_STATUS_CODE[DB_QUERY_FAILED_CODE]
            });
        }
        return res.status(SUCCESS_STATUS_CODE).json({ 
            message: 'Teams inserted successfully', 
            data: result,
            err: false,
            status_code: SUCCESS_STATUS_CODE
        });
    });
});

module.exports = router;
