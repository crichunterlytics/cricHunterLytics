const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const db = require("../lib/chlDb.js");

router.get("/series_list", (req, res, next) => {
    console.log(req.params);
    db.query(`SELECT * FROM chl_Series`,
      [],
      function (error, results, fields) {
        if (error) {
          throw error;
          return res.status(201).send({
            msg: error,
            err: true,
          });
        }
        console.log(results);
        return res.status(200).send({
          data: results,
          err: false,
        });
      }
    );
});

module.exports = router;
