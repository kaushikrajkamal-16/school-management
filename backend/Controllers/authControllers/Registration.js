const { sendMail } = require("../../helpers/mailService");
const userSchema = require("../../models/user");
const generateOTP = require("../../utils/generateOtp");
const isStrongPassword = require("../../utils/isStrongPassword");
const isValidEmail = require("../../utils/isValidEmail");

const Registration = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    if (!name.trim() || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email is not valid.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message: "Password is not strong.",
      });
    }

    if (role && !["admin", "teacher", "student"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role. Must be admin, teacher, or student.",
      });
    }

    const existingUser = await userSchema.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    const emailverifyotp = generateOTP();

    const user = await userSchema.create({
      name,
      email,
      password,
      role: role || "student",
      isApproved: role === "admin" ? true : false,
      emailverifyotp,
      emailverifyotpExpiry: Date.now() + 24 * 10 * 1000,
    });

    await sendMail({
      email,
      Subject: "OTP Verification Mail",
      otp: emailverifyotp,
    });

    return res.status(200).json({
      success: true,
      message: "Registration Successful please verify email",
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = Registration;
