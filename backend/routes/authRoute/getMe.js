const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const getMe = require("../../Controllers/authControllers/getMe");
const router = express.Router();

router.get("/me", authMiddleware, getMe);

module.exports = router;
