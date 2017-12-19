const jwt = require('jsonwebtoken')

const PassportLocalStrategy = require('passport-local').Strategy

const UserRole = require('../../models/userModels/UserRole');
const User = require('../../models/userModels/User');
const Beekeeper = require('../../models/userModels/Beekeeper');
const Buyer = require('../../models/userModels/Buyer');
const Partner = require('../../models/userModels/Partner');
const Admin = require('../../models/Admin/Admin');


module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, async (req, email, password, done) => {

  const reqUser = req.body;
  let user = undefined;
  let token = ''
  let userData = {};
  let userToReturn = {};
  try {
    user = await UserRole.findOne({ email: reqUser.email });

    if (!user) {
      const error = new Error('Incorrect email or password')
      error.name = 'IncorrectCredentialsError'

      return done(error)
    }

    let ispartner = false;
   

    switch (user.role) {
      case 'user':
        userData = await User.findOne({ email: user.email });
        userToReturn = {
          'id': userData._id,
          'firstName': userData.firstName,
          'lastName': userData.lastName,
          'email': userData.email,
          'role': 'user'
        }
        break;
      case 'beekeeper':
        userData = await Beekeeper.findOne({ email: user.email });
     
        userToReturn = {
          'id': userData._id,
          'companyName': userData.companyName,
          'firstName': userData.firstName,
          'lastName': userData.lastName,
          'location': userData.location,
          'email': userData.email,
          'role': 'beekeeper'
        }
        break;
      case 'buyer':
        userData = await Buyer.findOne({ email: user.email });
        ispartner = await Partner.findOne({ companyEmail: user.email });
        userToReturn = {
          'id': userData._id,
          'companyName': userData.companyName,
          'companyInformation': userData.companyInformation,
          'companyLocation': userData.companyLocation,
          'email': userData.email,
        }

        if (ispartner) {
          userToReturn['role'] = 'partner'
        } else {
          userToReturn['role'] = 'buyer'
        }
        break;
      case 'admin':
        userData = await Admin.findOne({ email: user.email });
        userToReturn = {
          'id': userData._id,
          'companyName': userData.companyName,
          'companyInformation': userData.companyInformation,
          'companyLocation': userData.companyLocation,
          'email': userData.email,
          'role': 'admin'
        }
        break;
      default:
        console.log(e);
        const error = new Error('Incorrect email or password')
        error.name = 'IncorrectCredentialsError'

        return done(error)
        break;
    }


    if (!userData.authenticate(reqUser.password)) {
      
      const error = new Error('Incorrect email or password')
      error.name = 'IncorrectCredentialsError'

      return done(error)
    }

    const payload = {
      sub: userData.email
    }

    // create a token string
    token = jwt.sign(payload, 's0m3 r4nd0m str1ng')


  } catch (e) {
    console.log(e);
    const error = new Error('Incorrect email or password')
    error.name = 'IncorrectCredentialsError'

    return done(error)
  }

  return done(null, token, userToReturn)
})


