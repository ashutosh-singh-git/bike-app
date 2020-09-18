const express = require('express');
const Feeds = require('../models/Feeds');
const router = express.Router();


/* GET users listing. */
router.get('/', function (req, res) {
     var regex=new RegExp(req.params.title,req.params.link,req.description.title,'i');
     Feeds.find({    $or: [
        {title: regex},
        {link: regex},
        {description: regex},
        {text: regex}
    ]}).then((result)=>{ 
         res.status(200).json(result)  
     })
})

module.exports = router;
