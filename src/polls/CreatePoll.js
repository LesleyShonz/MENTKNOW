/**
 * CreatePoll Component
 *
 * This component provides a UI for users to create a new poll.
 * It includes a dynamic set of input fields for the poll question and options,
 * as well as validation logic and an API call to submit the poll data.
 *
 * Dependencies:
 * - React useState hook
 * - axios for making API calls
 * - Local CSS for styling
 * - Icons for UI feedback
 */

import React, { useState } from "react";
import axios from "axios";
import "./CreatePoll.css";
import erro from "../icons/exclamation 6.svg";

const CreatePoll = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [message, setMessage] = useState(""); // To provide feedback to the user


  /**
   * Updates the option at the given index with the provided value.
   * @param {number} index - Index of the option to update.
   * @param {string} value - New value for the option.
   */
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  /**
  * Appends a new empty option to the options state.
  */
  const addOption = () => setOptions([...options, ""]);


  /**
   * Validates the form inputs.
   * @returns {string|null} - A validation message or null if form is valid.
   */
  const validateForm = () => {
    if (!question.trim()) return "Please enter a question.";
    for (let option of options) {
      if (!option.trim()) return "Please fill out all options.";
    }
    return null;
  };

  /**
   * Handles form submission.
   * - Validates the form.
   * - Makes an API call to create the poll.
   * - Provides feedback to the user based on the result.
   * @param {Event} e - Form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationMessage = validateForm();
    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        "x-auth-token": token,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5004/api/polls",
        { question, options },
        config
      );
      if (response.status === 200) {
        setMessage("Poll created successfully!");
      } else {
        setMessage(
          response.data.msg || "Unknown error occurred while creating poll."
        );
      }
    } catch (error) {
      setMessage("Error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="create-container-poll"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <form onSubmit={handleSubmit}>
        <input
          className="question-container"
          type="text"
          placeholder="Enter your question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            className="options-container"
            key={`option-${index}`}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}
        <p className="add-option-key" type="button" onClick={addOption}>
          + Add option
        </p>

        <div className="error-message-container-poll">
          <div className="create-form-error">
            {message !== "Poll created successfully!" && message != "" && (
              <p>
                {" "}
                <img src={erro} alt="error" className="error-style" /> {message}
              </p>
            )}{" "}
            {message === "Poll created successfully!" && (
              <p className="poll-success"> {message}</p>
            )}
          </div>
        </div>
        <button className="create-poll-button" type="submit">
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
