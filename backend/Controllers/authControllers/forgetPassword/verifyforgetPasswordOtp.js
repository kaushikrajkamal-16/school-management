const userSchema = require("../../../models/user");

const verifyforgetPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const user = await userSchema.findOne({ email });

    if (!user.forgetPasswordotp || !user.forgetPasswordExpiry) {
      return res
        .status(400)
        .json({ message: "No OTP request found. Please request a new OTP" });
    }

    if (user.forgetPasswordotp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.forgetPasswordExpiry) {
      return res
        .status(400)
        .json({ message: "OTP has expired. Please request a new one" });
    }

    res.status(200).json({ message: "Otp verified Successfully" });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error,
    });
  }
};

module.exports = verifyforgetPasswordOtp;
