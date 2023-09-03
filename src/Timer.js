import React, { useState, useEffect } from "react";
import "./Timer.css";
function Timer() {
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const formattedTime = () => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

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

  const start = () => {
    if (remainingSeconds === 0) return;

    const id = setInterval(() => {
      setRemainingSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    setIntervalId(id);
    setIsRunning(true);
  };

  const pause = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setIsRunning(false);
  };

  const reset = () => {
    const inputMinutes = prompt("Enter number of minutes:");

    if (inputMinutes < 60) {
      pause();
      setRemainingSeconds(inputMinutes * 60);
    }
  };

  useEffect(() => {
    if (remainingSeconds === 0 && isRunning) {
      pause();
    }
  }, [remainingSeconds, isRunning]);

  return (
    <div className="timer">
      <span className="timer__part timer__part--minutes">
        {formattedTime()}
      </span>
      <span className="timer__part">:</span>
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
