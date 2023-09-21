/**
 * NavigationBar Component
 *
 * Represents the navigation bar with multiple interactive options such as "Polling" and "Timer".
 * When a navigation button is clicked, its respective component (e.g., Poll or Timer)
 * gets rendered on the screen.
 *
 * Props:
 * - `activityName` (string): Name of the current activity.
 *
 * State:
 * - `activeButtons` (array): Tracks the currently active navigation buttons.
 * - `showMainPoll` (boolean): Determines whether the MainPoll component should be displayed.
 *
 * @component
 */

import Timer from "../Timer/Timer";
import React, { useState } from "react";
import "./NavigationBar.css";
import PollingIcon from "../assets/polling_icon.svg";
import TimerIcon from "../assets/Timer_icon.svg";
import MainPoll from "../polls/MainPoll";

const NavigationBar = ({ activityName }) => {
  const [activeButtons, setActiveButtons] = useState([]);
  const [showMainPoll, setShowMainPoll] = useState(false);
  /**
   * handleButtonClick
   *
   * Toggles the given button's active state. If the button is already active, it gets deactivated,
   * otherwise, it gets activated.
   *
   * @param {string} buttonName - Name of the button to toggle.
   */
  const handleButtonClick = (buttonName) => {
    if (activeButtons.includes(buttonName)) {
      setActiveButtons(activeButtons.filter((name) => name !== buttonName));
    } else {
      setActiveButtons([...activeButtons, buttonName]);
    }
  };

  return (
    <>
      <div className="navigation-bar">
        <div
          className={`nav-button ${
            activeButtons.includes("Polling") ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Polling")}
        >
          <img src={PollingIcon} alt="Polling" className="icon" />
          Polling
        </div>
        <div
          className={`nav-button ${
            activeButtons.includes("Timer") ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Timer")}
        >
          <img src={TimerIcon} alt="Timer" className="icon" />
          Timer
        </div>
      </div>

      <div className="component-display">
        {activeButtons.includes("Timer") && <Timer />}
      </div>
      {activeButtons.includes("Polling") && <MainPoll />}
    </>
  );
};

export default NavigationBar;
