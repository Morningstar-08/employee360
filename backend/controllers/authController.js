const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SCRET, { expiresIn: "7d" });
};

// @desc Register a new user
// @route POST /api/auth/signup
// @access Public
const signupUser = async (req, res) => {};

// @desc Login user
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {};

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private (Requires JWT)
const getUserProfile = async (req, res) => {};

module.exports = { signupUser, loginUser, getUserProfile };
