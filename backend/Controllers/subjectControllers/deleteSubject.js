const Subject = require("../../models/subject");
const mongoose = require("mongoose");

const deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Subject not found or the subject is not valid.",
      });
    }

    await Subject.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Subject deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting subject.",
      error: error.message,
    });
  }
};

module.exports = deleteSubject;
