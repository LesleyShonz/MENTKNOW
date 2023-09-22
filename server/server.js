/**
 * MentKnow Main Server
 *
 * This server application manages user interactions, ratings, polls, and analytics
 * for activities. It provides various API endpoints to manage user data, fetch
 * analytics, post ratings, and retrieve total contributions. The server connects
 * to a MongoDB database for persistent data storage.
 *
 * Key Features:
 * - CORS enabled for cross-origin requests.
 * - Express.js for API route handling.
 * - Mongoose for MongoDB object modeling and interactions.
 *
 * Available Routes:
 * - Users, Polls, and Activities management routes.
 * - Ratings and analytics retrieval.
 *
 * Database:
 * - Connection to MongoDB using Mongoose.
 * - A rating schema to store activity ratings and contributions.
 *
 * Server Configuration:
 * - The server listens on a predefined port or 5004 by default.
 */

//import the required modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 5004;
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/polls", require("./routes/api/polls"));
app.use("/api/activities", require("./routes/api/activities"));

// Database Connection Feedback
mongoose
  .connect(
    "mongodb+srv://Lesley:MENTKNOW@mentknow.alii0fr.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error: ", err));

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

/**
 * Mongoose schema for ratings.
 * - activityName: Name of the activity.
 * - totalRating: Total rating for the activity.
 * - numRatings: Number of ratings given.
 * - averageRating: Average rating value.
 * - numContributions: Number of contributions towards the activity.
 */
const ratingSchema = new mongoose.Schema(
  {
    activityName: String,
    totalRating: Number,
    numRatings: Number,
    averageRating: Number,
    numContributions: Number,
  },
  { versionKey: false }
);

const Rating = mongoose.model("Rating", ratingSchema);

/**
 * @route   POST /api/ratings
 * @desc    Post the rating to the database.
 * @access  Public
 * @param   {string} activityName - Name of the activity.
 * @param   {number} totalRating - Total rating for the activity.
 * @param   {number} numContributions - Number of contributions towards the activity.
 */
app.post("/api/ratings", async (req, res) => {
  const { activityName, totalRating, numContributions } = req.body;
  try {
    const existingRating = await Rating.findOne({ activityName });
    if (existingRating) {
      existingRating.totalRating += totalRating;
      existingRating.numRatings += 1;
      existingRating.numContributions = numContributions;
      existingRating.averageRating =
        existingRating.totalRating / existingRating.numRatings;
      await existingRating.save();
    } else {
      const newRating = new Rating({
        activityName,
        totalRating,
        numRatings: 1,
        averageRating: totalRating,
        numContributions: numContributions,
      });
      await newRating.save();
    }
    res.status(201).json({ message: "Rating saved successfully" });
  } catch (error) {
    console.error("Error saving rating:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving the rating" });
  }
});

/**
 * @route   GET /api/analytics
 * @desc    Fetch analytics based on ratings data.
 * @access  Public
 * @param   None
 */
app.get("/api/analytics", async (req, res) => {
  try {
    const data = await Rating.find();
    res.setHeader("Content-Type", "application/json");
    res.json(data);
  } catch (err) {
    console.error("Error fetching analytics:", err);
    res
      .status(500)
      .json({ message: "Error fetching analytics", error: err.message });
  }
});
/**
 * @route   GET /api/totalContributions
 * @desc    Retrieve the total number of contributions across all activities.
 * @access  Public
 * @param   None
 */
app.get("/api/totalContributions", async (req, res) => {
  try {
    const result = await Rating.aggregate([
      {
        $group: {
          _id: null,
          totalContributions: { $sum: "$numContributions" },
        },
      },
    ]);
    const totalContributions =
      result && result[0] ? result[0].totalContributions : 0;
    res.json({ totalContributions });
  } catch (err) {
    console.error("Error fetching total contributions:", err);
    res.status(500).json({
      message: "Error fetching total contributions",
      error: err.message,
    });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
