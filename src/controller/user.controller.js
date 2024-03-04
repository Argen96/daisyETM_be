import { validationResult } from 'express-validator'
import ApiError from "../error/apiError.js";
import { insertDataSignUp, verifyDataLogIn } from '../respositories/user.collection.js';
async function signUp(request) {
    const error = validationResult(request)
    if (!error.isEmpty()) {
      error.array().forEach(err => {
        throw new ApiError(err.msg, 400)
      })
    }
    const result = await insertDataSignUp(request);
    return result;
  }

  async function logIn(request) {
    const error = validationResult(request)
    if (!error.isEmpty()) {
      error.array().forEach(err => {
        throw new ApiError(err.msg, 400)
      })
    }
    const result = await verifyDataLogIn(request);
    return result;
  }

export { signUp, logIn }