var express = require('express');
let Parser = require('rss-parser');
var xmlParser = require('fast-xml-parser');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send({
        "message": "This",
        "data": as
    });
});

let parser = new Parser({
    defaultRSS: 2.0,
    customFields: {
        item: [
            ['content:encoded', 'contentEncoded'],
        ]
    }
});


const xmlOptions = {
    ignoreAttributes : false,
    ignoreNameSpace : true,
    parseNodeValue : false,
};

parser.parseURL('https://www.motorcyclistonline.com/arcio/rss/', function(err, feed) {

    feed.items.forEach(function(entry) {
        const parsedData = xmlParser.parse(entry['content:encoded'], xmlOptions);
        let img = '';
        if(parsedData.img){
            if(parsedData.img.length > 1){
                img = parsedData.img[0]['@_src'];
            }else {
                img = parsedData.img['@_src'];
            }
        }
        as.push({
            'id': 0,
            'title': entry.title,
            'link': entry.link,
            'description': entry.contentSnippet,
            'pubDate': entry.pubDate,
            'img': img,
            'categories': entry.categories,
            'creator': {
                'text': 'motorcyclistonline.com'
            }
        });
    })
});

const as = [
];

module.exports = router;
