import { useEditor } from "@tldraw/tldraw";
import { track } from "signia-react";
import Ratings from "./Ratings";
import { useState, useEffect } from "react";
import "./NavigationBar.css";
import arrow from "./assets/Arrow_left_light.png";
import { text } from "express";

// Define a component wrapped with tracking functionality
export const UserPresence = track(() => {
  const editor = useEditor();

  // Extract user color and name from the editor's user object
  const { color, name } = editor.user;
  const activityName = editor.currentPage.name;

  // State to control the visibility of the review board component
  const [showReviewBoard, setShowReviewBoard] = useState(false);
  const [numContributions, setNumContributions] = useState(0); // Initialize numNotes state

  const handleReviewBoardClick = () => {
    setShowReviewBoard(!showReviewBoard);
    let countNotes = 0; // Temporary variable to count notes
    for (let i = 0; i < editor.shapesArray.length; i++) {
      //Count the number of sticky notes with text
      if (
        editor.shapesArray.at(i).type === "note" &&
        editor.shapesArray.at(i)?.props["text"] !== ""
      ) {
        countNotes += 1;
      }
    }
    setNumContributions(countNotes); // Update numNotes state
    // console.log(editor.shapesArray.at(8)?.props["text"]); // This will still log the previous value due to closure
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
        {showReviewBoard && (
          <Ratings
            activityName={activityName}
            numContributions={numContributions}
          />
        )}

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
