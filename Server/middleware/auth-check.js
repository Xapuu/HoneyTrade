
const jwt = require('jsonwebtoken');

const User = require('mongoose').model('User');
const Beekeeper = require('mongoose').model('Beekeeper');
const Buyer = require('mongoose').model('Buyer');

const beekeeperAuth = require('./beekeeper-auth-check');
const buyerAuth = require('./buyer-auth-check');
const userAuth = require('./user-auth-check');
const adminAuth = require('./admin-auth-check');
const partnerAuth = require('./partner-auth-check');

module.exports = {
  beekeeperAuth,
  buyerAuth,
  userAuth,
  adminAuth,
  partnerAuth
}


// module.exports =  (req, res, next) => {
  
//   if (!req.headers.authorization) {
//     return res.status(401).json({
//       success: false,
//       message: 'You are unauthorized'
//     })
//   }

 
//   const type = req.headers.authorization.split(' ')[0];
//   const token = req.headers.authorization.split(' ')[1]

 
//   return jwt.verify(token, 's0m3 r4nd0m str1ng', (err, decoded) => {
//     if (err) {
//       return res.status(401).json({
//         success: false,
//         message: 'You are unauthorized'
//       })    }

//     const userEmail = decoded.sub

//     let userRole =  UserRole.findOne({ email: userEmail });

//     if (!userRole) {
//       return res.status(401).json({
//         success: false,
//         message: 'You are unauthorized'
//       })
//     }


//     let user = null;
//     switch (type) {
//       case 'User':
//         user = userAuth(userEmail);
//         break;
//       case 'Beekeeper':
//         user = beekeeperAuth(userEmail);
//         break;
//       case 'Buyer':
//         user = buyerAuth(userEmail);
//         break;
//       case 'Admin':
//         user = adminAuth(userEmail);
//         break;
//       case 'Partner':
//         user = partnerAuth(userEmail);
//       default:
//         return res.status(401).end();
//     }

//     console.log('==============================');
    
//     console.log(user);
    

//     if (!user) {
//       return res.status(401).json({
//         success: false,
//         message: 'You are unauthorized'
//       })
//     }

//     req.user = user;

//     return next()
//   })
// }
