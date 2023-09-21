/**
 * Ratings Component
 *
 * Provides an interface for users to rate an activity. Allows users to submit a star rating
 * and navigates them to an appropriate dashboard (Mentor or Mentee) upon completion.
 *
 * Props:
 * - `activityName` (string): Name of the current activity being rated.
 * - `numContributions` (number): Number of contributions (ratings) for the current activity.
 *
 * State:
 * - `rating` (number): Holds the user's selected rating (0-5).
 * - `submitted` (boolean): Determines if the rating has been submitted.
 * - `error` (string|null): Holds error messages for display.
 *
 * @component
 */
import React, { useState } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import "./Ratings.css";
import { useNavigate } from "react-router-dom";
import errorIcon from "../assets/error.svg";

function Ratings({ activityName, numContributions }) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  /**
   * handleRatingChange
   *
   * Updates the current rating selection and resets any submission state and errors.
   *
   * @param {number} newRating - The new rating value selected by the user.
   */
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setSubmitted(false);
    setError(null);
  };
  /**
   * handleSubmitRating
   *
   * Submits the selected rating to the server.
   * Navigates the user to the appropriate dashboard upon success.
   */
  const handleSubmitRating = async () => {
    if (rating <= 0) {
      setError("Please select a rating before exiting.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5004/api/ratings", {
        activityName: activityName,
        totalRating: rating,
        numContributions: numContributions,
      });
      setSubmitted(true);
      if (userData.userType === "mentee") {
        navigate("/dashboard");
      } else {
        navigate("/mentorDashboard");
      }
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
        <StarRatings
          rating={rating}
          starRatedColor={submitted ? "rgb(203, 211, 227)" : "gold"}
          changeRating={handleRatingChange}
          numberOfStars={5}
          name="rating"
          disabled={submitted}
        />
        <br />

        {submitted ? (
          <p>Thank you for your rating!</p>
        ) : (
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
