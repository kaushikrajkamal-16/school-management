const { sendMail } = require("../../helpers/mailService");
const User = require("../../models/user");
const generateOTP = require("../../utils/generateOtp");

const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const formattedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: formattedEmail });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Account is already verified. Please log in.",
      });
    }

    const emailverifyotp = generateOTP();

    user.emailverifyotp = emailverifyotp;
    user.emailverifyotpExpiry = Date.now() + 1 * 60 * 1000;
    await user.save();

    await sendMail({
      email,
      Subject: "OTP Verification Mail",
      otp: emailverifyotp,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to email ",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = resendOtp;
