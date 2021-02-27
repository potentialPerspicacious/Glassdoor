'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
var { secret } = require('./db.config');
const db = require('../models');
const { response } = require('express');
const student = db.student;
const company = db.company;

function auth() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: secret,
  };
  passport.use(
    new JwtStrategy(opts, (jwt_payload, callback) => {
      const user_id = jwt_payload.id;
      let model = student;
      if (jwt_payload.type === 'company') {
        model = company;
      }
      model
        .findByPk(user_id)
        .then((data) => {
          callback(null, data);
        })
        .catch((err) => {
          callback(null, false);
        });
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
