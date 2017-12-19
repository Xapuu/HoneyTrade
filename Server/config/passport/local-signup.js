const PassportLocalStrategy = require('passport-local').Strategy
const encryption = require('../../util/encryption');
const UserRole = require('mongoose').model('UserRole');
const User = require('mongoose').model('User');
const Beekeeper = require('mongoose').model('Beekeeper');
const Buyer = require('mongoose').model('Buyer');


module.exports = new PassportLocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  session: false,
  passReqToCallback: true
}, async (req, email, password, done) => {
  const reqUser = req.body
  let user;

  try {
    if (reqUser.password === '' || reqUser.password.match(/(\s)/)) {
      const error = new Error('Incorrect email or password')
      return done(error)
    }

    // Switch types and create user
    let users = await UserRole.find({});
      let exists = false;
      for (let u of users) {
        if (u.email === reqUser.email) {
          exists = true;
          break;
        }
      }

      if (exists) {
        return done('User already exists');
      }
      
      await UserRole.create({
        email: reqUser.email,
        role: req.body.type
      })

      const salt = encryption.generateSalt();
      const hashedPass =
        encryption.generateHashedPassword(salt, reqUser.password);


      switch (reqUser.type) {
        case 'user':
          user = await User.create({
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            email: reqUser.email,
            hashedPass: hashedPass,
            salt: salt
          });
          break;
        case 'beekeeper':
          user = await Beekeeper.create({
            firstName: reqUser.firstName,
            lastName: reqUser.lastName,
            companyName: reqUser.companyName,
            location: reqUser.location,
            email: reqUser.email,
            hashedPass: hashedPass,
            salt: salt
          });
          break;
        case 'buyer':
          user = await Buyer.create({
            companyName: reqUser.companyName,
            companyLocation: reqUser.companyLocation,
            companyInformation: reqUser.companyInformation,
            email: reqUser.email,
            hashedPass: hashedPass,
            salt: salt,
            role: []
          })
        default:
          break;
      }

  } catch (e) {
    console.log(e);
    return done(e.message)
  }

  return done(null);
})
