const express = require("express");
const forgetPassword = require("../../../Controllers/authControllers/forgetPassword/forgetPassword");
const verifyforgetPasswordOtp = require("../../../Controllers/authControllers/forgetPassword/verifyforgetPasswordOtp");
const resetPassword = require("../../../Controllers/authControllers/forgetPassword/resetpassword");
const router = express.Router();

router.post("/forgetPassword", forgetPassword);
router.post("/verifyforgetPasswordOtp", verifyforgetPasswordOtp);
router.post("/resetpassword", resetPassword);

module.exports = router;
