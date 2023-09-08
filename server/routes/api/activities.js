// server/routes/api.js
const express = require("express");
const router = express.Router();
const Activity = require("../../models/activity");
const cors = require("cors");
const app = express();
// Create a new activity or update an existing one
router.post("/activities", async (req, res) => {
  const { activityName, discussion, activities, resources } = req.body;
  try {
    // Check if the activity already exists
    const existingActivity = await Activity.findOne({ activityName });

    if (existingActivity) {
      // Update the existing activity
      existingActivity.discussion += discussion;
      existingActivity.activities += activities;
      existingActivity.resources += resources;

      await existingActivity.save();

      return res.json(existingActivity);
    } else {
      // Create a new activity
      const newActivity = new Activity({
        activityName,
        discussion,
        activities,
        resources,
      });
      await newActivity.save();
      return res.json(newActivity);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
