const mongoose = require("mongoose");

// Define a new schema for the "activity" collection in the database
const activitySchema = new mongoose.Schema({
  activityName: String,
  discussion: String,
  activities: String,
  resources: String,
});

module.exports = mongoose.model("Activity", activitySchema);
