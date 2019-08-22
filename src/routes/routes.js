const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport-config/strategies');
const controller = require('../controllers/controllers');
const authMiddleware = require('../middleware/middleware');

router.get('/', controller.homePage);
router.get('/login', controller.loginPage);
router.get('/register', controller.registerPage);
router.get('/secrets', authMiddleware, controller.secretsPage);
router.get('/logout', authMiddleware, controller.logout);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  controller.googleSignIn
);

router.post('/register', controller.registerUser);
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/secrets',
        failureRedirect: '/login'
    })
);

module.exports = router;