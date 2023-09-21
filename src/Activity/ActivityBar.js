/**
 * Activitybar Component
 *
 * This component renders an interactive dropdown for toggling between discussions and resources
 * related to an activity. When an option is clicked, the associated content is displayed using
 * the Activity component.
 *
 * Props:
 * - `activityName` (string): The name of the current activity for which discussions and resources will be fetched.
 *
 * State:
 * - `isDropdownVisible` (boolean): Controls the visibility of the dropdown menu.
 * - `isDiscussionClicked` (boolean): Indicates if the Discussions button was clicked.
 * - `isResourcesClicked` (boolean): Indicates if the Resources button was clicked.
 *
 * @component
 */
import React, { useState } from "react";
import Activity from "./Activities";
import ActivityIcon from "../assets/Activity_icon.svg";
import "./NavigationBar.css";

export default function Activitybar({ activityName }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDiscussionClicked, setDiscussionClicked] = useState(false);
  const [isResourcesClicked, setResourcesClicked] = useState(false);

  /**
   * Toggles the visibility of the dropdown menu.
   */
  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  /**
   * Toggles the state for the Discussions content.
   */
  const toggleDiscussion = () => {
    setDiscussionClicked(!isDiscussionClicked);
  };

  /**
   * Toggles the state for the Resources content.
   */
  const toggleResources = () => {
    setResourcesClicked(!isResourcesClicked);
  };

  return (
    <div className="nav-3">
      <div
        className="activity-dropdown"
        onMouseEnter={toggleDropdown}
        onMouseLeave={toggleDropdown}
      >
        <div
          className={`nav-button ${
            isDiscussionClicked
              ? "clicked"
              : isResourcesClicked
              ? "clicked"
              : ""
          }`}
        >
          <img src={ActivityIcon} alt="book" className="icon" />
          Activity
        </div>
        {isDropdownVisible && (
          <div className="dropdown-content">
            <button
              className={`dropdown-button ${
                isDiscussionClicked ? "clicked" : ""
              }`}
              onClick={toggleDiscussion}
            >
              Discussions
            </button>
            <button
              className={`dropdown-button ${
                isResourcesClicked ? "clicked" : ""
              }`}
              onClick={toggleResources}
            >
              Resources
            </button>
          </div>
        )}
      </div>
      <div>
        {isDiscussionClicked && (
          <Activity
            activityName={activityName}
            isDiscussionClicked={isDiscussionClicked}
            isResourcesClicked={isResourcesClicked}
          />
        )}
        {isResourcesClicked && (
          <Activity
            activityName={activityName}
            isDiscussionClicked={isDiscussionClicked}
            isResourcesClicked={isResourcesClicked}
          />
        )}
      </div>
    </div>
  );
}
