/**
 * API Component for MentKnow Application.
 * This component serves as a way of handline API requests.
 *
 * @author: Lesley Shonhiwa
 * @colaborators :Chloe Walt and Sizwe Nkosi
 * @version: 1.1
 * @license: University of Cape Town, School of IT license
 */
const express = require("express");
const router = express.Router();
const Activity = require("../../models/Activity");
const cors = require("cors");
const app = express();

// Route for creating or updating an activity
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

// Route for fetching activities as an array of objects
router.get("/activities", async (req, res) => {
  try {
    const activities = await Activity.find();

    // Send each activity as an individual object in an array
    return res.json(activities);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
