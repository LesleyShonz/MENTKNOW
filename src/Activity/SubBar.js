/**
 * Whiteboard SubBar Component for MentKnow Application.
 * This component serves as a way of adding the "Dashboard button" to the
 * Navigation bar.
 *
 * @author: Lesley Shonhiwa
 * @colaborators :Chloe Walt and Sizwe Nkosi
 * @version: 1.1
 * @license: University of Cape Town, School of IT license
 */
import "./NavigationBar.css";
import { useState } from "react";
import DashboardIcon from "../assets/Dashboard_icon.svg";
import Ratings from "./Ratings";

export default function SubBar({ editor, activityName }) {
  // State to control the number of contributions on the Whiteboard
  const [numContributions, setNumContributions] = useState(0);
  // State to control the visibility of the review board component
  const [showReviewBoard, setShowReviewBoard] = useState(false);
  // Show/hide review board
  const handleReviewBoardClick = () => {
    console.log("handleReviewBoardClick " + showReviewBoard);
    setShowReviewBoard(!showReviewBoard);

    let countNotes = 0; // Temporary variable to count notes
    for (let i = 0; i < editor.shapesArray.length; i++) {
      //Count the number of sticky notes with text as number of contributions
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
        {/* Display button and set onClick event */}
        <div
          className={`nav-button ${showReviewBoard ? "active" : ""}`}
          onClick={handleReviewBoardClick}
        >
          <img src={DashboardIcon} alt="arrowhead" className="icon" />
          Dashboard
        </div>
      </div>
      {/* Render the review board and pass props to the component */}
      {showReviewBoard && (
        <Ratings
          activityName={activityName}
          numContributions={numContributions}
        />
      )}
    </>
  );
}
