import React, { useState } from "react";
import axios from "axios";
import "./CreatePoll.css";
import reject3 from "../icons/reject3.svg";
import erro from "../icons/exclamation 6.svg";

const CreatePoll = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [message, setMessage] = useState(""); // To provide feedback to the user

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleImageClick = () => {
    setIsVisible(false); // set to false to hide, or toggle with !isVisible if you want to show/hide on alternate clicks
  };

  const addOption = () => setOptions([...options, ""]);

  const validateForm = () => {
    if (!question.trim()) return "Please enter a question.";
    for (let option of options) {
      if (!option.trim()) return "Please fill out all options.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
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
        <img
          className="exit-poll"
          src={reject3}
          alt="Click to hide container"
          onClick={handleImageClick}
        />
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
            {/* Displaying feedback message */}
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
