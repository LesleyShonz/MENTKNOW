import React, { useState } from "react";
import axios from "axios";
import StarRatings from "react-star-ratings";
import "./Ratings.css";

function Ratings({ activityName }) {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false); // State to track submission

  // console.log("Page ID test" + editor.currentPage.name);
  const handleRatingChange = (newRating) => {
    setRating(newRating);
    setSubmitted(false); // Reset submitted state when rating changes
  };

  const handleSubmitRating = async () => {
    try {
      const response = await axios.post("http://localhost:5009/api/ratings", {
        activityName: activityName,
        totalRating: rating,
      });
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="Ratings">
      <p>how did you find the {activityName} activity?</p>
      <StarRatings
        rating={rating}
        starRatedColor={submitted ? "rgb(203, 211, 227)" : "gold"} // Change color if submitted
        changeRating={handleRatingChange}
        numberOfStars={5}
        name="rating"
      />
      <br></br>
      <button onClick={handleSubmitRating}>Submit Rating</button>
    </div>
  );
}

export default Ratings;
