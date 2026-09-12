const User = require("../../models/user");

const verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required.",
      });
    }

    const formattedEmail = email.toLowerCase().trim();

    // 2. Locate user
    const user = await User.findOne({ email: formattedEmail });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User is already verified",
      });
    }

    if (!user.emailverifyotp || user.emailverifyotp !== otp.toString().trim()) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (user.emailverifyotpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired please request a new OTP",
      });
    }

    user.isVerified = true;
    user.emailverifyotp = "";
    user.emailverifyotpExpiry = undefined;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Account verified successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = verifyEmailOtp;
