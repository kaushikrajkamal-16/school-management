const express = require("express");
const router = express.Router();
const registration = require("./Registration");
const verifyEmailOtp = require("./verifyEmailOtp");
const resendOtp = require("./resendOtp");
const login = require("./Login");
const getMe = require("./getMe");
const forgetPassword = require("./forgetPassword/forgetPassword");

router.use("/authRoute", registration);
router.use("/authRoute", verifyEmailOtp);
router.use("/authRoute", resendOtp);
router.use("/authRoute", login);
router.use("/authRoute", getMe);
router.use("/authRoute", forgetPassword);

module.exports = router;
