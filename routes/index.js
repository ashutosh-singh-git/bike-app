const {parseRss} = require('../service/Parser');

const express = require('express');
const router = express.Router();


/* Parsing started */
router.get('/', function (req, res, next) {

    parseRss();
    res.send({
        "message": "accepted",
    });
});

module.exports = router;
