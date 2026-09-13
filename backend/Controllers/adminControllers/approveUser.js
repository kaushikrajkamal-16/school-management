const User = require("../../models/user");

const approveUser = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).send("Email is undefined");

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { isApproved: true } },
      { returnDocument: "after" },
    );

    res.status(200).json({
      user: user,
      message: "User data Updated Successfully",
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

module.exports = approveUser;
