/**
 * Models Component for MentKnow Application.
 * This component serves as a way of creating the activities table.
 * in the database
 *
 * @author: Lesley Shonhiwa
 * @colaborators :Chloe Walt and Sizwe Nkosi
 * @version: 1.1
 * @license: University of Cape Town, School of IT license
 */
const mongoose = require("mongoose");
//Specify Schema
const activitySchema = new mongoose.Schema({
  activityName: String,
  discussion: String,
  activities: String,
  resources: String,
});

module.exports = mongoose.model("Activity", activitySchema);
