isValidEmail = require("../../../utils/isValidEmail");
const { sendMail } = require("../../../helpers/mailService");
const userSchema = require("../../../models/user");
const generateOTP = require("../../../utils/generateOtp");

const forgetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "email are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email is not valid.",
      });
    }

    const existingUser = await userSchema.findOne({
      email: email.toLowerCase(),
    });

    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "No user found with this email",
      });
    }

    const forgetPasswordotp = generateOTP();

    const user = await userSchema.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        forgetPasswordotp,
        forgetPasswordExpiry: Date.now() + 5 * 60 * 1000,
      },
      { new: true },
    );

    await sendMail({
      email,
      Subject: "Forget Password OTP Verification Mail",
      otp: forgetPasswordotp,
    });

    res.status(200).json({
      success: true,
      message: "A forget Password OTP has been sent to your email",
      user: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = forgetPassword;
