const beekeeperValidation = require('./registrationFormsValidation/beekeeperRegFormValidation');
const buyerValidation = require('./registrationFormsValidation/buyerRegFormValidation');
const userValidation = require('./registrationFormsValidation/userRegFormValidation');
const loginValidation = require('./loginFormValidation');

const formValidations = {
    beekeeperValidation,
    buyerValidation,
    userValidation,
    loginValidation
}

module.exports = formValidations;