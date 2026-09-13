const User = require("../../models/user");

const getApprovedUser = async (req, res) => {
  try {
    const user = await User.find({ isApproved: true });

    res.status(200).json({
      user: user,
      message: "User data fetched Successfully",
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

module.exports = getApprovedUser;
