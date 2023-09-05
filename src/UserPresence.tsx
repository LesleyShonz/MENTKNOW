import { useEditor } from "@tldraw/tldraw";
import { track } from "signia-react";
import Ratings from "./Ratings";
import { useState, useEffect } from "react";
import "./NavigationBar.css";
import arrow from "./assets/Arrow_left_light.png";

// Define a component wrapped with tracking functionality
export const UserPresence = track(() => {
  const editor = useEditor();

  // Extract user color and name from the editor's user object
  const { color, name } = editor.user;
  const activityName = editor.currentPage.name;

  // State to control the visibility of the review board component
  const [showReviewBoard, setShowReviewBoard] = useState(false);

  // Toggle the review board's visibility
  const handleReviewBoardClick = () => {
    setShowReviewBoard(!showReviewBoard);
  };

  return (
    <>
      <div style={{ pointerEvents: "all", display: "flex" }}>
        {/* Button to toggle the review board */}
        <div className="dashboard-button" onClick={handleReviewBoardClick}>
          <img src={arrow} alt="arrowhead" className="icon" />
          Dashboard
        </div>
        {/* Render the Ratings component if showReviewBoard is true */}
        {showReviewBoard && <Ratings activityName={activityName} />}

        {/* Input to change user color */}
        <input
          type="color"
          value={color}
          onChange={(e) => {
            editor.user.updateUserPreferences({
              color: e.currentTarget.value,
            });
          }}
        />
        {/* Input to change user name */}
        <input
          value={name}
          onChange={(e) => {
            editor.user.updateUserPreferences({
              name: e.currentTarget.value,
            });
          }}
        />
      </div>
    </>
  );
});
