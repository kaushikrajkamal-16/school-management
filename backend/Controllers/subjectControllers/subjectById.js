const Subject = require("../../models/subject");
const mongoose = require("mongoose");

const subjectById = async (req, res) => {
  let { id } = req.params;

  console.log(id);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Subject not found or the subject is not valid.",
      });
    }
    const subjectInfo = await Subject.findById(id);

    return res.status(200).json({
      success: true,
      message: "subject retrieved successfully.",
      data: subjectInfo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve subjects.",
      error: error.message,
    });
  }
};

module.exports = subjectById;
