require('dotenv').config();
require('./config/mongoose-config/mongoose-config');
const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const passport = require('passport');
const expressSession = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(expressSession);
const router = require('./routes/routes');

const app = express();
const publicDirPath = path.join(__dirname, 'public');
const viewsDirPath = path.join(__dirname, 'views');
const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_CONNECTION_STR,
    collection: 'sessions'
});
sessionStore.on('error', (error) => {
    console.log(error.message);
});

app.set('view engine', 'ejs');
app.set('views', viewsDirPath);

app.use(express.static(publicDirPath));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    unset: 'destroy'
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(3000, () => console.log('server started on port 3000'));