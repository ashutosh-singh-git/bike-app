const express = require('express');
const Feeds = require('../models/Feeds');
const router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {

    const {id} = req.body;
    Feeds.findOne({_id: id})
        .then(feed => {
            var newScore = feed.score + 10 * 60 * 1000;
            Feeds.updateOne({_id: id}, {score: newScore})
                .then(feed => {
                    res.send({
                        "message": "Successfully Updated",
                    });
                })
                .catch(error => {
                    res.send({
                        "message": "Data Not Found",
                    });
                });
        });
});


module.exports = router;
