const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const e = require("express");

const app = express();
const PORT = process.env.PORT || 5009;

app.use(cors());
app.use(express.json());

// MongoDB connection setup (replace <connection_string> with your actual connection string)
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
  },
  { versionKey: false }
);

const Rating = mongoose.model("Rating", ratingSchema);

// Define route for saving ratings
app.post("/api/ratings", async (req, res) => {
  const { activityName, totalRating } = req.body;

  try {
    // Check if the activity already exists in the database
    const existingRating = await Rating.findOne({ activityName });

    if (existingRating) {
      // Increment the total number of ratings for the existing activity
      existingRating.totalRating += totalRating;
      existingRating.numRatings += 1;
      //Get the average rating for the existing activity
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
