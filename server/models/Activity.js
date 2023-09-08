// server/models/activity.js
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  activityName: String,
  discussion: String,
  activities: String,
  resources: String,
});

module.exports = mongoose.model("Activity", activitySchema);
