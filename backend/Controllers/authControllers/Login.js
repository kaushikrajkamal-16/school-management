const User = require("../../models/user");
const generateAccessToken = require("../../utils/accessToken");
const isValidEmail = require("../../utils/isValidEmail");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email is not valid.",
      });
    }

    const formattedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: formattedEmail }).select(
      "+password",
    );

    // console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User email is not verified",
      });
    }

    const isMatchPass = await user.ComparePassword(password);

    // console.log(isMatchPass);

    if (!isMatchPass) {
      return res.status(400).json({
        isMatchPass: isMatchPass,
        success: false,
        message: "Password is incorrect",
      });
    }

    const accessToken = generateAccessToken({
      _id: user._id,
      email: user.email,
    });

    res.cookie("accessToken", accessToken, { maxAge: 24 * 60 * 60 * 1000 });

    return res.status(200).json({
      success: true,
      message: "login Successfully",
      accessToken: accessToken,
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

module.exports = login;
