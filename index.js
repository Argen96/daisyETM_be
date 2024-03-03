import express from 'express'
import cors from 'cors'
import { errorHandler } from './src/error/errorHandler.js';
import asyncHandler from './src/middlewares/asyncHandler.js';
import { signUpValidator, logInValidator } from './src/validation/validation.users.js';
import { signUp, logIn } from './src/controller/user.controller.js';

const port = 80
const app = express()
app.use(cors())
app.use(express.json())


  app.post(
      "/api/sign-up", signUpValidator, asyncHandler(async (request, response) => {
        const result = await signUp(request)
        response.status(200)
        response.json(result)
      }))
    
  app.post(
      "/api/log-in", logInValidator, asyncHandler(async (request, response) => {
        const user = await logIn(request)
        response.status(200)
        response.json({ ...user, password: "" })
      }))

  app.use(errorHandler)

  app.listen(port, ()=>console.log(`Port is available in port ${port}`))