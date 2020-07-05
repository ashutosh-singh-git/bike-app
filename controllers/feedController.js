const express = require('express');
const Feeds = require('../models/Feeds');
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    let {score, limit} = req.query;
    score = score ? score : Number.MAX_VALUE;
    limit = limit ? Number(limit) : 20;
    console.log("Score : ", score, limit);
    Feeds.find({score: {$lte: score}}).limit(limit).sort('-score')
        .then(feed => {
            res.send({
                "message": "Success",
                "total" : feed.length,
                "data": feed,
            });
        })
        .catch(error => {
            console.log("Error : ", error);
            res.send({
                "message": "Data Not Found",
            });
        });
});

module.exports = router;
