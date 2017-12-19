function validateBeekeeperRegistrationForm(userForm) {
    
        const emailPattern = /(?:[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    
        const errors = {}
        let isFormValid = true
        let message = ''
    
    
        // if (!userForm || typeof userForm.firstName !== 'string') {
        //     isFormValid = false
        //     errors.firstName = 'Please provide a correct first name.'
        // }
    
        // if (!userForm || typeof userForm.lastName !== 'string') {
        //     isFormValid = false
        //     errors.lastName = 'Please provide a correct last name.'
        // }

        
        if (!userForm || typeof userForm.companyName !== 'string' ) {
            isFormValid = false
            errors.companyName = 'Please provide a correct company name.'
        }

        if(!userForm.firstName && userForm.lastName && !userForm.companyName){
            isFormValid = false
            errors.firstName = 'Please provide a correct first name.'
        }

        if(userForm.firstName && !userForm.lastName && !userForm.companyName){
            isFormValid = false
            errors.lastName = 'Please provide a correct last name.'
        }

        if(!userForm.firstName && !userForm.lastName && !userForm.companyName){
            isFormValid = false
            errors.name = 'Please provide either first and last name or company name.'
        }
    
        if (!userForm || typeof userForm.location !== 'string' || userForm.location.trim().length <= 0) {
            isFormValid = false
            errors.location = 'Please provide a correct location.'
        }

        if (!userForm || typeof userForm.email !== 'string' || userForm.email.trim().length <= 0 || userForm.email.match(emailPattern) == null) {
            isFormValid = false
            errors.email = 'Please provide a correct email address.'
        }
    
        if (!userForm || typeof userForm.password !== 'string' || userForm.password.trim().length < 4) {
            isFormValid = false
            errors.password = 'Password must have at least 4 characters.'
        }
    
        if (!userForm || typeof userForm.confirmPassword !== 'string' || userForm.confirmPassword.trim().length < 4) {
            isFormValid = false
            errors.confirmPassword = 'Password must have at least 4 characters.'
        }

        if(userForm.password !== userForm.confirmPassword){
            isFormValid = false
            errors.passwords = 'Passwords do not match.'
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
    
    module.exports = validateBeekeeperRegistrationForm;