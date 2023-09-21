/**
 * Timer Component
 *
 * Provides an interface for a countdown timer. The timer can be started, paused,
 * and reset to a user-defined value.
 *
 * State:
 * - `remainingSeconds` (number): The number of seconds remaining in the countdown.
 * - `intervalId` (number): The ID of the timer interval, used to clear the interval.
 * - `isRunning` (boolean): Indicates if the timer is currently running or paused.
 *
 * @component
 */
import React, { useState, useEffect } from "react";
import "./Timer.css";

function Timer() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  /**
   * formattedTime
   *
   * Formats the remaining time into a MM:SS string representation.
   *
   * @returns {string} Formatted time.
   */
  const formattedTime = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  /**
   * updateInterfaceControls
   *
   * Generates the appropriate control button (start or pause) based on
   * the timer's state.
   *
   * @returns {JSX.Element} The button to be displayed.
   */
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

  /**
   * start
   *
   * Starts the countdown timer. Sets an interval that decrements the
   * remainingSeconds every second.
   */
  const start = () => {
    if (remainingSeconds === 0) return;

    const id = setInterval(() => {
      setRemainingSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setIntervalId(id);
    setIsRunning(true);
  };

  /**
   * pause
   *
   * Pauses the countdown timer. Clears the timer interval.
   */
  const pause = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setIsRunning(false);
  };

  /**
   * reset
   *
   * Prompts the user for a new time (in minutes) and resets the timer to that value.
   */
  const reset = () => {
    const inputMinutes = prompt("Enter number of minutes:");
    if (inputMinutes !== null) {
      const minutes = parseInt(inputMinutes, 10);
      if (!isNaN(minutes) && minutes < 60) {
        pause();
        setRemainingSeconds(minutes * 60);
      } else {
        alert(
          "Invalid input. Please enter a valid number of minutes less than 60."
        );
      }
    }
  };

  useEffect(() => {
    if (remainingSeconds === 0 && isRunning) {
      pause();
    }
  }, [remainingSeconds, isRunning]);

  return (
    <div className="Timer">
      <span className="timer__part timer__part--minutes">
        {formattedTime()}
      </span>
      <span className="timer__part"></span>
      <span className="timer__part timer__part--seconds"></span>
      {updateInterfaceControls()}
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
