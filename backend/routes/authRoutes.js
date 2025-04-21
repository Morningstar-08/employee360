const express = require("express");
const {
    signupUser,
    loginUser,
    getUserProfile,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.get("/profile", getUserProfile);

module.exports = router;
