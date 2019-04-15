const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateChatInput(data) {
    let errors = {};
    let maximumMsgSize = 300;

    data.text = !isEmpty(data.text) ? data.name : '';
    
    if (!Validator.isLength(data.text, { min: 2, max: maximumMsgSize })) {
        errors.text = 'Message must be between 2 and ' + maximumMsgSize + ' characters';
    }
    
    return {
      errors,
      isValid: isEmpty(errors)
    };
  };

  