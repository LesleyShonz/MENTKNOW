// Import the required modules
const express = require("express");
const router = express.Router();
const Activity = require("../../models/Activity");
const cors = require("cors");
const app = express();

// @route   POST api/activities
// @desc    Create a new activity
// @access  Public
router.post("/activities", async (req, res) => {
  const { activityName, discussion, activities, resources } = req.body;
  try {
    const existingActivity = await Activity.findOne({ activityName });
    if (existingActivity) {
      existingActivity.discussion += discussion;
      existingActivity.activities += activities;
      existingActivity.resources += resources;
      await existingActivity.save();
      return res.json(existingActivity);
    } else {
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

// @route   GET api/activities
// @desc    Get the activity details for a given activity
// @access  Public
router.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find();
    return res.json(activities);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
