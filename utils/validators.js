const { body } = require('express-validator');
module.exports = {
  registerValidator: [
    
    body('password').custom((value) => {
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      const isValid = regex.test(value);
      if(!isValid) return Promise.reject("invalid password sequence");
      return Promise.resolve();
    }),
  ],
};






