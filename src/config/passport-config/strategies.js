const passport = require('passport');
const UserModel = require('../../models/user');
const localStrategy = require('./local-strategy');
const googleStrategy = require('./google-strategy');

passport.use(localStrategy);
passport.use(googleStrategy);

// session config
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    UserModel.findOne({_id: id}, (err, user) => {
        done(err, user);
    });
});