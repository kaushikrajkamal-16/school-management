const express = require("express");
const authMiddleware = require("../../middleware/authMiddleware");
const getMe = require("../../Controllers/authControllers/getMe");
const limiter = require("../../middleware/limiter");
const router = express.Router();

router.get("/me", limiter, authMiddleware, getMe);

module.exports = router;
