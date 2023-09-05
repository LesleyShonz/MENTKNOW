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
const NavigationBar = ({ activityName }) => {
  const [activeButtons, setActiveButtons] = useState([]);

  const handleButtonClick = (buttonName) => {
    if (activeButtons.includes(buttonName)) {
      setActiveButtons(activeButtons.filter((name) => name !== buttonName));
    } else {
      setActiveButtons([...activeButtons, buttonName]);
    }
  };

  return (
    <div>
      <div className="navigation-bar">
        <button
          className={`nav-button ${
            activeButtons.includes("Activity") ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Activity")}
        >
          <img src={ActivityIcon} alt="Activity" className="icon" />
          Activity
        </button>
        <button
          className={`nav-button ${
            activeButtons.includes("Polling") ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Polling")}
        >
          <img src={PollingIcon} alt="Polling" className="icon" />
          Polling
        </button>
        <button
          className={`nav-button ${
            activeButtons.includes("Timer") ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Timer")}
        >
          <img src={TimerIcon} alt="Timer" className="icon" />
          Timer
        </button>
        <button
          className={`nav-button ${
            activeButtons.includes("Template") ? "active" : ""
          }`}
          onClick={() => handleButtonClick("Template")}
        >
          <img src={TemplateIcon} alt="Template" className="icon" />
          Template
        </button>
        <button
          className={`nav-button ${
            activeButtons.includes("React") ? "active" : ""
          }`}
          onClick={() => handleButtonClick("React")}
        >
          <img src={ReactIcon} alt="React" className="icon" />
          React
        </button>
      </div>

      <div className="component-display">
        {/* {activeButtons.includes("Activity") && <ActivityComponent />}
        {activeButtons.includes("Polling") && <PollingComponent />} */}
        {activeButtons.includes("Timer") && <Timer />}
        {/* {activeButtons.includes("Template") && <TemplateComponent />}
        {activeButtons.includes("React") && <ReactComponent />} */}
        {/* {showReviewBoard && <Ratings activityName={activityName} />} */}
        {/* Conditional rendering of dashboard component */}
      </div>
    </div>
  );
};

export default NavigationBar;
