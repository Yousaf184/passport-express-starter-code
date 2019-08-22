var GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../../models/user');

module.exports = new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
        userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo'
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await User.findOne({ googleId: profile.id });

            // if user with google id doesn't exists, create new record in database
            if (!user) {
                const email = profile.emails[0].value;
                const user = new User({ email: email, googleId: profile.id });
                await user.save();
            }

            return done(null, user);

        } catch (error) {
            console.log(error.message);
        }
    }
);