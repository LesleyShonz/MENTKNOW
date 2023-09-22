/**
 * Activities API Routes
 *
 * Defines the API endpoints for creating and retrieving activities.
 * - POST /api/activities: Create or update an activity.
 * - GET /api/activities: Retrieve a list of all activities.
 */
// Import the required modules
const express = require("express");
const router = express.Router();
const Activity = require("../../models/Activity");
const cors = require("cors");
const app = express();

/**
 * Creates or updates an activity.
 *
 * @route POST /api/activities
 * @access Public
 * @param {string} activityName - The name of the activity
 * @param {string} discussion - Discussion content related to the activity
 * @param {string} activities - List of activities or actions
 * @param {string} resources - Resources related to the activity
 */
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

/**
 * Retrieves a list of all activities.
 *
 * @route GET /api/activities
 * @access Public
 */
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
