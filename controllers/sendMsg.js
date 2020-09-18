const express = require('express');
const Feeds = require('../models/Feeds');
const router = express.Router();
var FCM = require('fcm-node');

var serverKey = 'AAAA5ad9m60:APA91bHUwHN1Bpz_8AtmBBJWT_JQGEHFuQhtoSfRJzc0keC5NjliUuECgtO7nnJaCaicaN4VASjg8Pa56wXTbR-4kxMsn4bd6KiO54pQnVRE0jxjXKIm3-ugajZAak--VmIi3pBHDTFw';
var topic1 = '/topics/blogs';
var fcm = new FCM(serverKey);



function sendNotification(message){
    fcm.send(message, function(err, response){
        if (err) {
            console.log("error=====>>",err);
        } else {
               console.log("Successfully sent with response: ", response);
            }
         });
}


router.post('/', function (req, res, next) {
        Feeds.findOne({_id:req.body.feedId}).exec((err,succ)=>{
            console.log("data====",err,"==================>",succ)
            if(err){
                res.send({
                    "responsCode":400,
                    "responseMessage":"something went wrong",
                    "error":err
                })
            }else if(!succ){
                res.send({
                    "responsCode":401,
                    "responseMessage":"Feed Data not found",
                    "data":succ
                })
            }else{
                var message = { 
                    to: topic1,  
                    notification: {
                        title: succ.title,"image":succ.img,
                        body:succ.description,
                    },
                   
                   };

                sendNotification(message)
                res.send({
                    "responsCode":200,
                    "responseMessage":"successfully send notification",
                    "data":succ
                }) 
            }
        })
     });


module.exports = router;
