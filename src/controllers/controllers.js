const User = require('../models/user');

const homePage = (req, res) => {
    res.render('home');
};

const loginPage = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('secrets');
    }

    res.render('login');
};

const registerPage = (req, res) => {
    res.render('register');
};

const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({email, password});
        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.log(error.message);
    }
};

const secretsPage = async (req, res) => {
    res.render('secrets');
};

const logout = (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
};

// will be called when google sign in succeeds
const googleSignIn = (req, res) => {
    res.redirect('/secrets');
};

module.exports = {
    homePage,
    loginPage,
    registerPage,
    registerUser,
    secretsPage,
    logout,
    googleSignIn
};