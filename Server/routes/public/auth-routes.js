const express = require('express');
const passport = require('passport');
const validator = require('validator');

const router = new express.Router();


const formValidations = require('../../util/formValidations');

const Notification = require('mongoose').model('Notification');
const Message = require('mongoose').model('Message');



router.post('/register', (req, res, next) => {
  let type = req.body.type;
  let userForm = req.body;
  let validationResult = {};

  switch (type) {
    case 'beekeeper':
      validationResult = formValidations.beekeeperValidation(userForm);
      break;
    case 'buyer':
      validationResult = formValidations.buyerValidation(userForm);
      break;
    case 'user':
      validationResult = formValidations.userValidation(userForm);
      break;
    default:
      validationResult.success = false;
      validationResult.message = 'Invalid type';
      break;
  }

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }


  return passport.authenticate('local-signup', (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err
      })
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully signed up! Now you should be able to log in.'
    })
  })(req, res, next)
})

router.post('/login', (req, res, next) => {
  const validationResult = formValidations.loginValidation(req.body)

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(400).json({
          success: false,
          message: err.message
        })
      }

      return res.status(400).json({
        success: false,
        message: 'Could not process the form.'
      })
    }

    return res.json({
      success: true,
      message: 'You have successfully logged in!',
      token,
      user: userData,
    })
  })(req, res, next)
})

module.exports = router
