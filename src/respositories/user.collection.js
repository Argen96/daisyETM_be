import { connect } from "../../db.js";
import { User } from "../../models/users.js";
import ApiError from "../error/apiError.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

async function insertDataSignUp(request) {
  try {
    await connect();

    const data = request.body;
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...data,
      password: hashPassword,
    });

    return newUser;
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError("This email is already used!", 400);
    }
    throw new ApiError("Error creating user", 500);
  }
}

async function verifyDataLogIn(request) {
    const { email, password } = request.body;

    try {
        await connect();
        const user = await User.findOne({ email });
        if (!user) throw new ApiError(`Invalid email or password!`, 401); 
        const isValidPass = await bcrypt.compare(password, user.password);
        if (!isValidPass) throw new ApiError(`Invalid email or password!`, 401); 
        const token = jwt.sign(
            { email: user.email, userId: user._id },
            process.env.TOKEN_KEY,
            { expiresIn: "10d" }
        );
        user.token = token;

        return user;
    } catch (error) {
        throw new ApiError("Error authenticating user", 500);
    }
}

  

export { insertDataSignUp, verifyDataLogIn };
