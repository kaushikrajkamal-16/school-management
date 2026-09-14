const requireApproved = async (req, res, next) => {
  try {
    // console.log(req.user.isApproved);

    if (!req.user.isApproved) {
      return res.status(403).json({
        success: false,
        message: "Your account is pending approval from admin.",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = requireApproved;
