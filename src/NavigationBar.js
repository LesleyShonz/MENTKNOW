// NavigationBar.js
import Timer from "./Timer";
import React, { useState } from "react";
import "./NavigationBar.css";
import ActivityIcon from "./assets/Activity_icon.png";
import PollingIcon from "./assets/polling_icon.png";
import TimerIcon from "./assets/Timer_icon.png";
import TemplateIcon from "./assets/Template_icon.png";
import ReactIcon from "./assets/React_icon.png";
import Ratings from "./Ratings";
import MainPoll from "./polls/MainPoll";

const NavigationBar = ({ activityName }) => {
  const [activeButtons, setActiveButtons] = useState([]);
  const [showMainPoll, setShowMainPoll] = useState(false);
  const handleButtonClick = (buttonName) => {
    if (activeButtons.includes(buttonName)) {
      setActiveButtons(activeButtons.filter((name) => name !== buttonName));
    } else {
      setActiveButtons([...activeButtons, buttonName]);
    }
  };

  const handlePollingButton = () => {
    setShowMainPoll(true);
    showMainPoll;
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
