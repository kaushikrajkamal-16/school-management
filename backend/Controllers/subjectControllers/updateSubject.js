const Subject = require("../../models/subject");
const mongoose = require("mongoose");

const updateSubject = async (req, res) => {
  const { id } = req.params;
  const { name, code, credits, description } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Subject not found or the subject is not valid.",
      });
    }

    const subject = await Subject.findById(id);

    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject not found." });
    }

    // 4. Check duplicate code
    if (code && code !== subject.code) {
      const existingSubject = await Subject.findOne({ code });

      if (existingSubject) {
        return res.status(409).json({
          success: false,
          message: "A subject with this code already exists.",
        });
      }
    }

    const updateData = {};

    if (name !== undefined) updateData.name = name;
    if (code !== undefined) updateData.code = code;
    if (credits !== undefined) updateData.credits = credits;
    updateData.description = description;

    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      {
        $set: updateData,
      },
      {
        returnDocument: "after",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Subject updated successfully.",
      subject: updatedSubject,
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

module.exports = updateSubject;
