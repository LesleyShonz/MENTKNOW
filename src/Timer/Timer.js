/**
 * Whiteboard Timer Component for MentKnow Application.
 * This component serves as a way of allowing users to make use of a timer
 * to time their time on the whiteboard.
 *
 * @author: Lesley Shonhiwa
 * @colaborators :Chloe Walt and Sizwe Nkosi
 * @version: 1.1
 * @license: University of Cape Town, School of IT license
 */
import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
  // State variables to manage timer functionality
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Format remaining time in MM:SS format
  const formattedTime = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Generate appropriate control button based on timer state
  const updateInterfaceControls = () => {
    return isRunning ? (
      <button
        type="button"
        className="timer__btn timer__btn--control timer__btn--stop"
        onClick={pause}
      >
        <span className="material-icons">pause</span>
      </button>
    ) : (
      <button
        type="button"
        className="timer__btn timer__btn--control timer__btn--start"
        onClick={start}
      >
        <span className="material-icons">play_arrow</span>
      </button>
    );
  };

  // Start the timer
  const start = () => {
    if (remainingSeconds === 0) return;

    const id = setInterval(() => {
      setRemainingSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setIntervalId(id);
    setIsRunning(true);
  };

  // Pause the timer
  const pause = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setIsRunning(false);
  };

  // Reset the timer
  const reset = () => {
    const inputMinutes = prompt("Enter number of minutes:");

    if (inputMinutes < 60) {
      pause();
      setRemainingSeconds(inputMinutes * 60);
    }
  };

  // useEffect to automatically pause the timer when it reaches 0
  useEffect(() => {
    if (remainingSeconds === 0 && isRunning) {
      pause();
    }
  }, [remainingSeconds, isRunning]);

  return (
    <div className="Timer">
      {/* Display the formatted time */}
      <span className="timer__part timer__part--minutes">
        {formattedTime()}
      </span>
      <span className="timer__part">:</span>
      <span className="timer__part timer__part--seconds"></span>

      {/* Display control buttons */}
      {updateInterfaceControls()}

      {/* Button to reset the timer */}
      <button
        type="button"
        className="timer__btn timer__btn--reset"
        onClick={reset}
      >
        <span className="material-icons">timer</span>
      </button>
    </div>
  );
}

export default Timer;
