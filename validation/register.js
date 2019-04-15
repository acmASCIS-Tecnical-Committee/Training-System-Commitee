const Validator = require('validator');
const isEmpty = require('./is-empty');
const axios = require('axios');

module.exports = function validateRegisterInput(data) {
    let errors = {};
  
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';
    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.phoneNo = !isEmpty(data.handle) ? data.phoneNo : '';

    if (Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (!Validator.isEmail(data.email)){
        errors.email = "Email must be valid";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = 'Password Confirmation field is required';
    }
    axios.get('http://codeforces.com/api/user.info?handles=' + data.handle)
        .then( userHandle => {
            if (userHandle.status = "FAILED")
            errors.handle = "Codeforces handle must be Valid";
        })
        .catch(err => errors.handle = err)
    if (!isEmpty(data.avatar)) {
        if (!Validator.isURL(data.avatar)) {
            errors.avatar = 'Not a valid URL';
        }
    }
    if (data.handle.length == 0) {
        errors.handle = 'At Least One Handle is required';
    }
    if (!Validator.isMobilePhone(data.phoneNo, "ar-EG")){
        errors.phoneNo = "Phone Number Must Be Valid";
    }
    if (Validator.isEmpty(data.phoneNo)) {
        errors.phoneNo = 'Phone Number field is required';
    }
    if(data.password2 != data.password){
        errors.password2 = 'Passwors must match';
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

  