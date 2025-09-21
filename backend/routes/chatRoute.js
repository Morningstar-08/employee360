// backend/routes/chatRoutes.js
const express = require("express");
const router = express.Router();
const { handleChatMessage } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware"); // Assuming you have auth

// Protect the route so only authorized users can access it
router.post("/", handleChatMessage);

module.exports = router;
