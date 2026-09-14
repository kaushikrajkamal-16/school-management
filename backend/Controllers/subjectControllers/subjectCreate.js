const subjectSchema = require("../../models/subject");

const subjectCreate = async (req, res) => {
  const { creatorId, name, code, credits, description } = req.body;

  try {
    if (!creatorId || !name || !code) {
      return res.status(400).json({
        success: false,
        message: "Creator ID, name, and code are required.",
      });
    }

    const existingSubject = await subjectSchema.findOne({
      code,
    });

    if (existingSubject) {
      return res.status(409).json({
        success: false,
        message: "A subject with this code already exists.",
      });
    }

    const newSubject = await subjectSchema.create({
      creatorId,
      name,
      code,
      credits,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "A new Subject created by Creator",
      newSubject: newSubject,
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

module.exports = subjectCreate;
