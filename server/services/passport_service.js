'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user_model');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    User.findOne({
      username: username
    }, '+passwordHash +salt', function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { msg: 'username not found' }); }
      if (!user.authenticate(password)) {
        return done(null, false, { msg: 'incorrect password' });
      }
      done(null, user);
    });
  }
));
