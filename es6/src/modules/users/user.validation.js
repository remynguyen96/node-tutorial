import Joi from 'joi';

export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
// 1 number 1 Upppercase > 6 character

export default {
  signUp : {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().regex(passwordReg).required(),
    }
  }
};
