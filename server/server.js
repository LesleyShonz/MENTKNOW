const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const e = require("express");

const app = express();
const PORT = process.env.PORT || 5004;

// Middleware to enable cross-origin resource sharing
app.use(cors());

// Middleware to parse JSON data in request bodies
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/polls", require("./routes/api/polls"));
app.use("/api/activities", require("./routes/api/activities"));
// MongoDB connection setup
mongoose.connect(
  "mongodb+srv://Lesley:MENTKNOW@mentknow.alii0fr.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define Mongoose schema and model for ratings
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

// Define route for saving ratings
app.post("/api/ratings", async (req, res) => {
  const { activityName, totalRating, numContributions } = req.body;

  try {
    // Check if the activity already exists in the database
    const existingRating = await Rating.findOne({ activityName });

    if (existingRating) {
      // Increment the total number of ratings for the existing activity
      existingRating.totalRating += totalRating;
      existingRating.numRatings += 1;
      existingRating.numContributions = numContributions;
      // Calculate the average rating for the existing activity
      existingRating.averageRating =
        existingRating.totalRating / existingRating.numRatings;
      await existingRating.save();
    } else {
      // Create a new Rating instance for the new activity
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
