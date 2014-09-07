'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var app = express();

app
  .get('/', passport.authenticate('twitter', {
    failureRedirect: '/signup',
    session: false
  }))

  .get('/callback', passport.authenticate('twitter', {
    failureRedirect: '/signup',
    session: false
  }), auth.setTokenCookie);

module.exports = app;
