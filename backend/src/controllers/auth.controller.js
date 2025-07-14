import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/helper.js";

/**
 * @route   POST /api/auth/register
 */
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    // Option 1: Return token in JSON
    // res.status(201).json({
    //   _id: newUser._id,
    //   name: newUser.name,
    //   email: newUser.email,
    //   token: generateToken(newUser._id),
    // });

    // Option 2 (Optional): Set token in HTTP-only cookie

    const token = generateToken(newUser._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .status(201)
      .json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * @route   POST /api/auth/login
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user?.password || "");

    if (!user || !isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Option 1: Return token in JSON
    // res.status(200).json({
    //   _id: user._id,
    //   name: user.name,
    //   email: user.email,
    //   token: generateToken(user._id),
    // });

    // Option 2 (Optional): Set token in HTTP-only cookie

    const token = generateToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * @route   POST /api/auth/logout
 */
export const logout = (req, res) => {
  // For cookie-based JWT
  res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  });
};
