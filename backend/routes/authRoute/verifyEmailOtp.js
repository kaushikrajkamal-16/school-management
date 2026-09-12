const express = require("express");
const verifyEmailOtp = require("../../Controllers/authControllers/verifyOtp");
const router = express.Router();

router.get("/verifyEmailOtp", verifyEmailOtp);

module.exports = router;
