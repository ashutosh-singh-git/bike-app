const express = require('express');
const Feeds = require('../models/Feeds');
const router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {

    Feeds.findOne({_id: req.body.Id})
        .then(feed => {
            var newScore = feed.score + 10 * 60 * 1000;
            Feeds.updateOne({_id: req.body.Id}, {score: newScore})
                .then(feed => {
                    res.send({
                        "message": "Successfully Updated",
                        "total": feed.length,
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
});


module.exports = router;
