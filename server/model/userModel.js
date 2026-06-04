import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
  },

  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [10, "Password must be at least 10 characters long"],
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
