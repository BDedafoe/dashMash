const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

// Load User model
const User = require('../models/User');

module.exports = function (gPassport) {
    gPassport.use(
      new GoogleStrategy({
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: '/auth/google/callback',
          passReqToCallback: true
        },
        async (request, accessToken, refreshToken, profile, done) => {
          const newUser = {
            googleID: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
          }
  
          try {
            let user = await User.findOne({ googleID: profile.id })
  
            if (user) {
              done(null, user)
            } else {
              user = await User.create(newUser)
              done(null, user)
            }
          } catch (err) {
            console.error(err)
          }
        }
      )
    )
  
    gPassport.serializeUser((user, done) => {
      done(null, user.id)
    })
  
    gPassport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => done(err, user))
    })
  }

module.exports = function(lPassport) {
    lPassport.use(
      new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        // Match user
        User.findOne({
          email: email
        }).then(user => {
          if (!user) {
            return done(null, false, { message: 'That email is not registered' });
          }
  
          // Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          });
        });
      })
    );
  
    lPassport.serializeUser(function(user, done) {
      done(null, user.id);
    });
  
    lPassport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
  };