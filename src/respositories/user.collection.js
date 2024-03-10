import { connect } from "../../db.js";
import { User } from "../../models/users.js";
import ApiError from "../error/apiError.js";
import jwt from "jsonwebtoken";
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
    delete newUser._doc.password;
    return newUser;
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError("This email is already used!", 400);
    }
    throw new ApiError(error.message, error.status);
  }
}

async function verifyDataLogIn(request) {
  const { email, password } = request.body;
  try {
    await connect();
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found!");
      throw new ApiError(`Invalid credentials!`, 401);
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) throw new ApiError(`Invalid credentials!`, 401);
    const token = jwt.sign(
      { email: user.email, userId: user._id },
      'token_value',
      { expiresIn: "1d" }
    );
    user.token = token;
    delete user._doc.password;
    return { ...user._doc, token };
  } catch (error) {
    throw new ApiError(error.message, error.status);
  }
}

export { insertDataSignUp, verifyDataLogIn };
