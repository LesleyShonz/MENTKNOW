/**
 * SubBar Component
 *
 * Provides an interface for users to toggle the review board and count the number
 * of contributions (notes) on the editor (Whiteboard). It then displays the `Ratings`
 * component when the review board is visible.
 *
 * Props:
 * - `editor` (object): The editor instance which contains the shapesArray to determine contributions.
 * - `activityName` (string): Name of the current activity.
 *
 * State:
 * - `numContributions` (number): Count of contributions (notes) on the Whiteboard.
 * - `showReviewBoard` (boolean): Determines if the review board (`Ratings` component) is visible.
 *
 * @component
 */
import "./NavigationBar.css";
import { useState } from "react";
import DashboardIcon from "../assets/Dashboard_icon.svg";
import Ratings from "./Ratings";

export default function SubBar({ editor, activityName }) {
  const [numContributions, setNumContributions] = useState(0);
  const [showReviewBoard, setShowReviewBoard] = useState(false);
  /**
   * handleReviewBoardClick
   *
   * Toggles the visibility of the review board (`Ratings` component) and counts
   * the number of contributions (notes with text) on the Whiteboard.
   */
  const handleReviewBoardClick = () => {
    console.log("handleReviewBoardClick " + showReviewBoard);
    setShowReviewBoard(!showReviewBoard);
    let countNotes = 0;
    for (let i = 0; i < editor.shapesArray.length; i++) {
      if (
        editor.shapesArray.at(i).type === "note" &&
        editor.shapesArray.at(i)?.props["text"] !== ""
      ) {
        countNotes += 1;
      }
    }
    setNumContributions(countNotes);
  };

  return (
    <>
      <div className="nav-2">
        <div
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
