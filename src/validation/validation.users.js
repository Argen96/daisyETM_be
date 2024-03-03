import { check } from 'express-validator'
import { validatePassword } from './filterPassword.js';

const signUpValidator = [
    check('first_name').notEmpty().withMessage('Firt name is required')
      .isLength({ max: 150 }).withMessage('Firt name must not exceed 150 characters'),
    check('last_name').notEmpty().withMessage('Last name is required')
      .isLength({ max: 150 }).withMessage('Last name must not exceed 150 characters'),
    check('email').isEmail().withMessage('Invalid email address')
      .isLength({ max: 150 }).withMessage('Email must not exceed 150 characters'),
    check('password').notEmpty().withMessage('Password is required')
      .bail()
      .custom(async (value) => {
        await validatePassword(value);
      }),
     check('phone_number').isLength({ max: 25 }).withMessage('Phone number must not exceed 25 characters'),
     check('address').isLength({ max: 150 }).withMessage('Address must not exceed 150 characters'),
     check('city').isLength({ max: 100 }).withMessage('Phone number must not exceed 100 characters'),
  ];
  
  const logInValidator = [
    check('email').isEmail().withMessage('Email Address is required'),
    check('password').notEmpty().withMessage('Password is required')
 ];
  
  export { signUpValidator, logInValidator}