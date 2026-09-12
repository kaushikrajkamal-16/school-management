const userSchema = require("../../../models/user");

const resetPassword = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
    console.log({ password, confirmPassword });

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const user = await userSchema.findOne({
      email: email.toLowerCase(),
    });

    // Set new password
    user.password = password;

    user.forgotPasswordOtp = undefined;
    user.forgotPasswordOtpExpiry = undefined;

    // Your pre-save middleware will hash the password
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
      user: user,
    });
  } catch (error) {
    console.log("Reset Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = resetPassword;
