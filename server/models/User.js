const mongoose = require("mongoose");

// Define a new schema for the "User" collection in the database
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["mentor", "mentee"], required: true },
  groupNumber: { type: Number, required: false },
  accessPin: { type: String, required: false },
});

module.exports = User = mongoose.model("user", UserSchema);
