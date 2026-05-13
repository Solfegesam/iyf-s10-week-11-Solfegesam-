import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

const register = async (req, res) => {
  try {
    const { username, email, password } =
      req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        error:
          "User with this email or username already exists"
      });
    }

    const user = await User.create({
      username,
      email,
      password
    });

    res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(
        error.errors
      ).map((e) => e.message);

      return res.status(400).json({
        errors: messages
      });
    }

    res.status(500).json({
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error:
          "Please provide email and password"
      });
    }

    const user = await User.findOne({
      email
    }).select("+password");

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    const isMatch =
      await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials"
      });
    }

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const getMe = async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      role: req.user.role
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export {
  register,
  login,
  getMe
};