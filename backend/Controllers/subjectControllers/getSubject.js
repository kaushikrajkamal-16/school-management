const subject = require("../../models/subject");

const getSubject = async (req, res) => {
  try {
    const subjects = await Subject.find();

    if (subjects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subjects found.",
      });
    }

    return res.status(200).json({
      //   length: subject.length,
      success: true,
      message: "Subjects retrieved successfully.",
      subjects,
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

module.exports = getSubject;
