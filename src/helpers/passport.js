const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;

// FACEBOOK STRATEGY
passport.use(new LinkedInStrategy({
    clientID: '77p92wjdt1xj3m',
    clientSecret: 'k0pzPwgz6Qv4mGVh',
    scope: ['r_emailaddress', 'r_liteprofile'],
}, (accessToken, refreshToken, profile, done) => done(null, {
    accessToken,
    refreshToken,
    profile,
})));

// // GOOGLE STRATEGY
passport.use(new GoogleTokenStrategy({
    clientID: '108595256943-qq5i3mc7cn5u10ghoflb9hp9n3os10oc.apps.googleusercontent.com',
    // clientSecret: 'your-google-client-secret',
}, (accessToken, refreshToken, profile, done) => done(null, {
    accessToken,
    refreshToken,
    profile,
})));

const authenticateWithPassportJS = (req, res, provider) => new Promise((resolve, reject) => {
    passport.authenticate(`${provider}-token`, { session: false }, (err, {accessToken, profile}) => {
        if (err) reject(err);
        resolve({ profile, accessToken });
    })(req, res);
});

module.exports = authenticateWithPassportJS;