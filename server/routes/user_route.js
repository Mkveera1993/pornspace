'use strict';
var express = require('express');
var router = express.Router();
var userService = require('../services/user_service');
var authService = require('../services/auth_service');
var passport = require('passport');
var _ = require('lodash');
require('./../services/passport_service');

/* GET users listing. */
router.get('/', function (req, res) {
  userService.getUsers(req.query, function (err, users) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(users);
    }
  });
});

router.get('/:id', function (req, res) {
  userService.getUser(req.params.id, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(user);
    }
  });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    var error = err || info;
    if (error) {
      return res.status(401).json(error);
    }
    if (!user) {
      return res.status(401).json({
        msg: 'login failed'
      });
    }
    req.user = _.omit(user.toObject(), ['passwordHash', 'salt']);
    res.json({
      user: _.omit(user.toObject(), ['passwordHash', 'salt']),
      token: authService.signToken(user._id)
    });
  })(req, res, next);
});




router.post('/logout', function (req, res) {
  userService.logout(req.body, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(user);
    }
  });
});

module.exports = router;
