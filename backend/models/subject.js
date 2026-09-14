const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Creator ID is required"],
    },
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
      maxlength: 100,
    },
    code: {
      type: String,
      required: [true, "Subject code is required"],
      unique: true,
      trim: true,
    },
    credits: {
      type: Number,
      required: false,
      min: [0, "Credits cannot be negative"],
    },
    description: {
      type: String,
      required: false,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("subject", subjectSchema);
