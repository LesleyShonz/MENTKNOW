import React, { useState } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import "./Ratings.css";
import { useNavigate } from "react-router-dom";

function Ratings({ activityName, numContributions }) {
  // State variables to manage rating, submission status, and error
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  // Function to handle changes in the selected rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setSubmitted(false);
    setError(null); // Reset error state when rating changes
  };

  // Function to handle rating submission
  const handleSubmitRating = async () => {
    try {
      // Send a POST request to the server with the rating data
      const response = await axios.post("http://localhost:5009/api/ratings", {
        activityName: activityName,
        totalRating: rating,
        numContributions: numContributions,
      });

      setSubmitted(true); // Mark submission as successful
      navigate('/dashboard')
    } catch (error) {
      setError("Error submitting rating. Please try again later.");
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="Ratings">
      <div className="content">
        <p id="rating-p">How would you rate the {activityName} activity?</p>
        {/* StarRatings component to allow user to rate */}
        <StarRatings
          rating={rating}
          starRatedColor={submitted ? "rgb(203, 211, 227)" : "gold"}
          changeRating={handleRatingChange}
          numberOfStars={5}
          name="rating"
          disabled={submitted} // Disable the stars after submission
        />
        <br />
        {error && <p className="error-message">{error}</p>}
        {submitted ? (
          <p>Thank you for your rating!</p>
        ) : (
          // Button to submit the rating
          <button
            id="rating-btn"
            onClick={handleSubmitRating}
            disabled={submitted}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Ratings;
