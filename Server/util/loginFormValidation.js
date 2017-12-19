function validateLoginForm(userForm) {
    const emailPattern = /(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    

    const errors = {}
    let isFormValid = true
    let message = ''
  
    if (!userForm || typeof userForm.email !== 'string' || userForm.email.trim().length <= 0 || userForm.email.match(emailPattern) == null) {
        isFormValid = false
        errors.email = 'Please provide a correct email address.'
    }
  
    if (!userForm || typeof userForm.password !== 'string' || userForm.password.trim().length <=- 0) {
      isFormValid = false
      errors.password = 'Please provide your password.'
    }
    
    if (!isFormValid) {
      message = 'Check the form for errors.'
    }
  
    return {
      success: isFormValid,
      message,
      errors
    }
}

module.exports = validateLoginForm;