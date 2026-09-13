const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  profilePicture: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
    maxlength: [500, "Bio cannot exceed 500 characters"],
  },
  address: {
    type: String,
    default: "",
    maxlength: [200, "Address cannot exceed 200 characters"],
  },
  role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    default: "student",
    required: [true, "Role is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  emailverifyotp: {
    type: String,
    default: "",
  },
  emailverifyotpExpiry: {
    type: Date,
  },
  forgetPasswordotp: {
    type: String,
  },
  forgetPasswordExpiry: {
    type: Date,
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    return res.status(500).send(`Internal Server Error: ${error}`);
  }
});

userSchema.methods.ComparePassword = async function (plainpassword) {
  return await bcrypt.compare(plainpassword, this.password);
};

module.exports = mongoose.model("user", userSchema);
