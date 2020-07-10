const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const feedControllers = require('./controllers/feedController');
const scoreControllers = require('./controllers/getScore');


const mongoose = require('mongoose');
let uri = "mongodb://heroku_cm2h40nc:f6qdbhs0mq6hv6ij982jr8s5r@ds339968.mlab.com:39968/heroku_cm2h40nc";
// let uri = 'mongodb://localhost/ukmdatabase'
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/parse', indexRouter);
app.use('/feeds', feedControllers);
app.use('/click', scoreControllers);


app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
