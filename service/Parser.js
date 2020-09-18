let Parser = require('rss-parser');
const xmlParser = require('fast-xml-parser');
const cron = require("node-cron");
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

cron.schedule("0 */4 * * *", function() {
    parseRss();
});

module.exports.parseRss = (async (req, res) => {
    const urlArr = [{"url": "https://www.motorcyclistonline.com/arcio/rss/", "name": "motorcyclistonline"},
        {"url": 'https://www.motorcyclecruiser.com/arcio/rss/', "name": "motorcyclecruiser"},
        {"url": 'https://www.cycleworld.com/arcio/rss/', "name": "cycleworld"},
        {'url': "https://www.visordown.com/articles/rss/", "name": "visordown"},
        {'url': "https://www.indianrides.com/motorcycle-tour-blog/feed/", "name": "indianrides"},
    ];
    for (let i = 0; i < urlArr.length; i++) {
        try {
            await parseUrlSystem(urlArr[i])
        } catch (e) {
            console.log("Error occured ", e);
        }
    }
});


function parseUrlSystem(urlObj) {
    parser.parseURL(urlObj.url, function (err, feed) {
        feed.items.forEach(function (entry) {
            try {
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
                        text: urlObj.name
                    },
                    created_at: new Date(),
                    updated_at: new Date()
                });

                console.log("Feeds Object ", feeds);


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
                        if (err) {
                            console.log("Error while saving doc ", err);
                        }
                    });
                });
            } catch (e) {
                console.error("Error in parsing data ", e);
            }
        })
    })
}
