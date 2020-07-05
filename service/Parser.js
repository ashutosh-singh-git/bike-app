let Parser = require('rss-parser');
const xmlParser = require('fast-xml-parser');
const Feeds = require('../models/Feeds');

let parser = new Parser({
    defaultRSS: 2.0,
    customFields: {
        item: [
            ['content:encoded', 'contentEncoded'],
        ]
    }
});


const xmlOptions = {
    ignoreAttributes: false,
    ignoreNameSpace: true,
    parseNodeValue: false,
};

const parseRss = (url = 'https://www.motorcyclistonline.com/arcio/rss/') =>{

    parser.parseURL(url, function (err, feed) {

        feed.items.forEach(function (entry) {
            const parsedData = xmlParser.parse(entry['content:encoded'], xmlOptions);
            let img = '';
            if (parsedData.img) {
                if (parsedData.img.length > 1) {
                    img = parsedData.img[0]['@_src'];
                } else {
                    img = parsedData.img['@_src'];
                }
            }

            let feeds = new Feeds({
                title: entry.title,
                link: entry.link,
                description: entry.contentSnippet,
                pubDate: entry.pubDate,
                img: img,
                categories: entry.categories,
                score: new Date(entry.pubDate).getTime(),
                creator: {
                    text: 'motorcyclistonline.com'
                },
                created_at: new Date(),
                updated_at: new Date()
            });

            Feeds.findOne({title: feeds.title}, function (err, doc) {
                if (err) {
                    console.log("Error while querying");
                }

                if (doc) {
                    doc.updated_at = new Date();
                } else {
                    doc = feeds;
                }

                doc.save(function (err) {
                    if(err){
                        console.log("Error while saving doc ", err);
                    }
                });
            });
        })
    });
};

module.exports = {parseRss};
