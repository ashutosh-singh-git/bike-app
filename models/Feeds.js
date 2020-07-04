const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FeedSchema = new Schema({
    title: {type: String, required: true, unique: true},
    link: {type: String, required: true},
    description: {type: String, required: true},
    pubDate: {type: Date, required: true},
    img: {type: String, required: true},
    categories: Array,
    creator: {
        text: String
    },
    created_at: Date,
    updated_at: Date
});

module.exports = mongoose.model('Feeds', FeedSchema);
