import React, { useState } from "react";
import Activity from "./Activities";
import ActivityIcon from "../assets/Activity_icon.png";
import "./NavigationBar.css"; // Import your CSS file

export default function Activitybar({ activityName }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isDiscussionClicked, setDiscussionClicked] = useState(false);
  const [isResourcesClicked, setResourcesClicked] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const toggleDiscussion = () => {
    setDiscussionClicked(!isDiscussionClicked);
  };

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
        <div className="nav-button">
          <img src={ActivityIcon} alt="book" className="icon" />
          Activity
        </div>
        {isDropdownVisible && (
          <div className="dropdown-content">
            <button
              className={`dropdown-button ${isDiscussionClicked ? "clicked" : ""
                }`}
              onClick={toggleDiscussion}
            >
              Discussions
            </button>
            <button
              className={`dropdown-button ${isResourcesClicked ? "clicked" : ""
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
