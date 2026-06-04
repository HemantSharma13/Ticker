// controllers/authController.js

import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { response } from "express";

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
    secure: false, // localhost
    sameSite: "lax",
  });

  return token;
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Check for empty fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //Check passworld length : More then 10 characters
    if (password.length < 10 || confirmPassword.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Passwords should be more then 10 characters long",
      });
    }

    // Check password match
    if (password !== confirmPassword) {
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
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALE_ROUNDS),
    );

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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("The body from login is:", req.body);
    // Check for empty fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT and send cookie
    const token = createSendToken(user, 200, req, res);

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
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

export const logout = (req, res) => {
  res.cookie("jwt", "", {
    expires: new Date(0), // Expire immediately
    httpOnly: true,
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export const protect = async (req, res, next) => {
  try {
    // 1. Get token from cookie
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in",
      });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded value of token:", decoded);

    // 3. Check if user still exists in database
    const currentUser = await User.findById(decoded.id).select("-password");

    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "User no longer exists",
      });
    }

    // 4. Attach user to request
    req.user = currentUser;

    // 5. Continue
    next();
  } catch (err) {
    return res.status(401).json({
      status: "fail",
      message: "Invalid or expired token",
    });
  }
};

export const getMe = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};
