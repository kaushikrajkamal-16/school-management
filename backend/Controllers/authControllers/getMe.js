const User = require("../../models/user");

const getMe = async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findOne({ _id: _id });

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

module.exports = getMe;
