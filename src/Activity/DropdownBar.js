import React, { useState, useRef } from "react";
import "./Activities.css";
import Discussion from "../assets/Discussion.svg";
import TopicIcon from "../assets/Topic_icon.png";
import axios from "axios";
const BulletImage = () => (
  <img
    src={Discussion}
    alt="Bullet Point"
    style={{ width: "12px", height: "12px", verticalAlign: "middle" }}
  />
);
const DropdownBar = ({ activityName, Topic, QuestionsTags, text, data }) => {
  const [content, setContent] = useState([]);
  const [textInput, setTextInput] = useState("");
  const dataAsString = data.toString();
  const sentences = dataAsString.split(/\.|\?/);
  console.log(sentences);
  const handleAddText = async () => {
    let newText = textInput.trim();
    if (!newText) {
      // Do nothing if newText is empty
      return;
    }
    if (
      !newText.endsWith("?") &&
      newText.length > 0 &&
      QuestionsTags === true &&
      text !== "Resource"
    ) {
      newText += "?";
    } else if (
      !newText.endsWith(".") &&
      newText.length > 0 &&
      QuestionsTags === false &&
      text !== "Resource"
    ) {
      newText += ".";
    }

    try {
      const response = await axios.post(
        "http://localhost:5004/api/activities/activities",
        {
          activityName: activityName, // Pass the required data to the server
          discussion: text == "Question" ? newText : "", // Update discussion field with newText
          activities: text == "Activity" ? newText : "", // Update activities field if needed
          resources: text == "Resource" ? newText : "", // Update resources field if needed
        }
      );

      // Handle the response as needed, e.g., update content based on the response
      const newItem = (
        <p key={Date.now()} style={{ display: "flex", alignItems: "center" }}>
          {Topic === "Discussion Question" && text !== "Resource" ? (
            <BulletImage />
          ) : (
            "•"
          )}
          <span>{` ${newText}`}</span>
        </p>
      );

      setContent((prevContent) => [...prevContent, newItem]);

      // Clear the input field
      setTextInput("");
      newText = "";
    } catch (error) {
      // Handle errors, e.g., log or display an error message
      console.error(error);
    }
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddText();
    }
  };

  return (
    <>
      <div className="sub-container">
        <h3 className="Act-H">{Topic}</h3>
        <div className="editable-container">
          <input
            id={text}
            type="text"
            placeholder={`Enter "${text}" here`}
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            onKeyPress={handleInputKeyPress}
          />
          <button onClick={handleAddText} className="add-button">
            Add Text
          </button>
          <div
            className="editable"
            onKeyDown={(e) => {
              // Prevent the default Enter key behavior in the content-editable div
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
            {/* Render each sentence as a new line */}

            {sentences.map((sentence, index) => (
              <p key={index} style={{ display: "flex", alignItems: "center" }}>
                {sentence.trim() !== "" ? ( // Check if the sentence is not empty
                  Topic === "Discussion Question" ? (
                    <BulletImage />
                  ) : (
                    "•"
                  )
                ) : null}
                <span>{` ${sentence.trim()}`}</span>
              </p>
            ))}
            {/* Render the dynamically added content */}
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownBar;
