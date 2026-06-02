// controllers/authController.js

import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  });

  return token;
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    // Check for empty fields
    if (!name || !email || !password || !confirm_password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check password match
    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, process.env.SALE_ROUNDS);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //Create JWT
    const token = createSendToken(user, 201, req, res);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
