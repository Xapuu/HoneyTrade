const passport = require('passport');
const localSignupStrategy = require('./local-signup');
const localLoginStrategy = require('./local-login');
//const User = require('mongoose').model('User');

module.exports = function() {
    // passport.use(new LocalPassport((username, password, done) => {
    //     User.findOne({ username: username }).then(user => {
    //         if (!user) return done(null, false);
    //         if (!user.authenticate(password)) return done(null, false);
    //         return done(null, user);
    //     });
    // }));
    passport.use('local-signup', localSignupStrategy);
    passport.use('local-login', localLoginStrategy);
};