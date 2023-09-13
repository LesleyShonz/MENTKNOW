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

    // console.log("userData:" + userData.userType);
    try {
      const response = await axios.post(
        "http://localhost:5004/api/activities/activities",
        {
          activityName: activityName, // Pass the required data to the server
          discussion: text == "Question" ? newText : "", // Update discussion field with newText
          activities: text == "Activity" ? newText : "", // Update activities field if needed
          resources: text == "Resource" ? newText + "{}" : "", // Update resources field if needed
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
  const userData = JSON.parse(localStorage.getItem("userData"));
  const isMentor = userData.userType;
  const renderContent = () => {
    if (text === "Resource") {
      // Split the data into individual links using spaces
      const links = dataAsString.split("{}");

      // Render each link as a separate hyperlink
      return (
        <div>
          {links.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link + "\n"}
            </a>
          ))}
        </div>
      );
    } else {
      // Render each sentence as a new line
      const sentences = dataAsString.split(/[.?]/);
      return sentences.map((sentence, index) => (
        <p key={index} style={{ display: "flex", alignItems: "center" }}>
          {sentence.trim() !== "" ? (
            Topic === "Discussion Question" ? (
              <BulletImage />
            ) : (
              "•"
            )
          ) : null}
          <span>
            {` ${sentence.trim()}`}
            {sentence.trim() !== ""
              ? Topic === "Discussion Question"
                ? "?"
                : "."
              : null}
          </span>
        </p>
      ));
    }
  };
  return (
    <>
      <div className="sub-container">
        <h3 className="Act-H">{Topic}</h3>
        <div className="editable-container">
          {isMentor == "mentor" && (
            <input
              className="Activity-text"
              id={text}
              type="text"
              placeholder={`Enter "${text}" here`}
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleInputKeyPress}
            />
          )}

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
            {/* Render as working hyperlinks if it's a Resource */}
            {renderContent()}
            {/* Render the dynamically added content */}
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownBar;
