const express = require("express");
const resendOtp = require("../../Controllers/authControllers/resendOtp");
const router = express.Router();

router.get("/resendOtp", resendOtp);

module.exports = router;
