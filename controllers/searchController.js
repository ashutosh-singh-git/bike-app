const express = require('express');
const Feeds = require('../models/Feeds');
const router = express.Router();


/* GET users listing. */
router.get('/', function (req, res) {
    const query = req.query.q;
    console.log(query);
    Feeds
        .find({$text: {$search: query}}, {score: {$meta: "textScore"}})
        .sort({score: {$meta: "textScore"}})
        .then((result) => {
            res.status(200).json(result)
        })
});

module.exports = router;
