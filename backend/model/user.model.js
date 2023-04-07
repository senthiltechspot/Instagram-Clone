const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    otp: { type: Number, required: true },
    name: { type: String },
    email: { type: String, unique: true, required: true },
    dpURL: { type: String },
    about: { type: String },
    isVerified: { type: Boolean, default: false },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
