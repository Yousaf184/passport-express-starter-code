const LocalStartegy = require('passport-local').Strategy;
const UserModel = require('../../models/user');
const bcrypt = require('bcrypt');

module.exports = new LocalStartegy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (username, password, done) => {
        const user = await UserModel.findOne({ email: username });

        if (!user) {
            return done(null, false);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return done(null, false);
        }

        return done(null, user);
    }
);