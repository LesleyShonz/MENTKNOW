import "./NavigationBar.css";
import { useState } from "react";
import DashboardIcon from "../assets/Dashboard_icon.png";
import Ratings from "./Ratings";
import { useEditor } from "@tldraw/tldraw";

export default function SubBar({ editor, activityName }) {
  const [numContributions, setNumContributions] = useState(0);
  // State to control the visibility of the review board component
  const [showReviewBoard, setShowReviewBoard] = useState(false);
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
  };

  return (
    <>
      <div className="nav-2">
        <div
          c
          className={`nav-button ${showReviewBoard ? "active" : ""}`}
          onClick={handleReviewBoardClick}
        >
          <img src={DashboardIcon} alt="arrowhead" className="icon" />
          Dashboard
        </div>
      </div>

      {showReviewBoard && (
        <Ratings
          activityName={activityName}
          numContributions={numContributions}
        />
      )}
    </>
  );
}
