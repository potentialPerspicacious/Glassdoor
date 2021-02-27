var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require("jsonwebtoken");
var passport = require("passport");
require("./config/passport");

app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(session({
  secret              : 'cmpe273_kafka_passport_mongo',
  resave              : false, 
  saveUninitialized   : false, 
  duration            : 60 * 60 * 1000, 
  activeDuration      :  5 * 60 * 1000
}));

app.use(express.static('./public'));

module.exports = app;