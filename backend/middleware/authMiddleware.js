const jwt = require("jsonwebtoken");
const User = require("./../models/user");

const authMiddleware = async (req, res, next) => {
  try {
    // 1. Extract access token from cookies
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return res.status(401).json({
        success: false,
        message: "Access token missing. Please log in.",
      });
    }

    // 2. Verify token using your secret key
    const decoded = jwt.verify(
      accessToken,
      process.env.JWT_SEC || "your_fallback_secret_key",
    );

    const user = await User.findById(decoded._id);

    req.user = user;

    console.log(req.user);
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired access token.",
    });
  }
};

module.exports = authMiddleware;
