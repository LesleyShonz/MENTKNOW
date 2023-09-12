/**
 * Whiteboard Ratings Component for MentKnow Application.
 * This component serves as a way of prompting the user to
 * add a review before exiting the board.
 *
 * @author: Lesley Shonhiwa
 * @colaborators :Chloe Walt and Sizwe Nkosi
 * @version: 1.1
 * @license: University of Cape Town, School of IT license
 */
import React, { useState } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import "./Ratings.css";
import { useNavigate } from "react-router-dom";
import errorIcon from "../assets/error.svg";
function Ratings({ activityName, numContributions }) {
  // State variables to manage rating, submission status, and error
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to handle changes in the selected rating
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setSubmitted(false);
    setError(null); // Reset error state when rating changes
  };

  // Function to handle rating submission
  const handleSubmitRating = async () => {
    if (rating <= 0) {
      setError("Please select a rating before exiting.");
      return; // Exit the function early if no rating has been selected
    }
    try {
      // Send a POST request to the server with the rating data
      const response = await axios.post("http://localhost:5004/api/ratings", {
        activityName: activityName,
        totalRating: rating,
        numContributions: numContributions,
      });

      setSubmitted(true); // Mark submission as successful
      navigate("/dashboard");
    } catch (error) {
      setError("Error submitting rating. Please try again later.");
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="Ratings">
      <div className="content">
        <p id="rating-p">How would you rate the {activityName} activity?</p>
        <div id="error">
          {error && (
            <img src={errorIcon} alt="exclamation" className="Erroricon" />
          )}
          {error && <p className="error-msg">{error}</p>}
        </div>

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
