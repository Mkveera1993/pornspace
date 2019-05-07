"use strict";
var express = require("express");
var cookieParser = require("cookie-parser");
var config = require("./config/config");
require("colors");
require("log-timestamp");

// auth purpose
var session = require("express-session");
var passport = require("passport");
var mongoose = require("mongoose");
var mongoStore = require("connect-mongo")(session);

var app = express();

app.use(express.static(__dirname + "../../public/"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(passport.initialize());

app.use(
  session({
    secret: config.secrets.session,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);
app.use("/api*", function(req, res, next) {
  if (req.query.queryString) {
    try {
      req.query = JSON.parse(req.query.queryString);
    } catch (err) {
      req.query = {};
    }
  }
  var st = new Date();
  res.on("finish", () => {
    var rt = st - new Date();
    if (res.statusCode >= 500) {
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode}  ${
          res.statusMessage
        } ${rt} ms`.red
      );
    } else if (res.statusCode >= 400) {
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${
          res.statusMessage
        } ${rt} ms`.yellow
      );
    } else if (res.statusCode >= 300) {
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${
          res.statusMessage
        } ${rt} ms`.cyan
      );
    } else if (res.statusCode >= 200) {
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${
          res.statusMessage
        } ${rt} ms`.green
      );
    } else {
      console.log(
        `${req.method} ${req.originalUrl} ${res.statusCode} ${
          res.statusMessage
        } ${rt} ms`.grey
      );
    }
  });

  next();
});

require("./routes/index")(app);

module.exports = app;
