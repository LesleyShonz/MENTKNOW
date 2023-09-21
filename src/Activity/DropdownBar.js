/**
 * DropdownBar Component
 *
 * This component renders the dynamic content of an activity, including discussion topics,
 * resources, and other related items. It provides an interactive field for a mentor to add
 * new content based on the type specified (e.g., Question, Activity, Resource).
 * The newly added content is then displayed and stored.
 *
 * Props:
 * - `activityName` (string): The name of the activity for which content is being added.
 * - `Topic` (string): Specifies the category of the content (e.g., "Discussion Questions").
 * - `QuestionsTags` (boolean): Indicates if the content should end with a question mark.
 * - `text` (string): Specifies the type of content (e.g., "Question", "Resource").
 * - `data` (array): Existing data to be displayed for the given activity and topic.
 *
 * State:
 * - `content` (array): Holds dynamically added content to be displayed.
 * - `textInput` (string): Temporarily holds the value of the input field.
 *
 * @component
 */
import React, { useState, useRef } from "react";
import "./Activities.css";
import Discussion from "../assets/Discussion.svg";
import axios from "axios";
const BulletImage = () => (
  // BulletImage is a simple function that returns an image for bullet points.
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

  /**
   * handleAddText
   *
   * Processes and adds the entered text to the content state. It ensures that questions
   * end with '?' and other texts end with '.'. It also sends the added content to the server.
   *
   * @async
   */
  const handleAddText = async () => {
    let newText = textInput.trim();
    if (!newText) {
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
          activityName: activityName,
          discussion: text == "Question" ? newText : "",
          activities: text == "Activity" ? newText : "",
          resources: text == "Resource" ? newText + "{}" : "",
        }
      );

      const newItem = (
        <p className="ActivitiesText" key={Date.now()}>
          {Topic === "Discussion Questions" && text !== "Resource" ? (
            <BulletImage />
          ) : (
            "•"
          )}
          <span
            style={{ marginLeft: "5px" }}
            className="ActivitiesText"
          >{` ${newText}`}</span>
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

  /**
   * handleInputKeyPress
   *
   * Detects when the 'Enter' key is pressed within the input field and triggers the
   * handleAddText function to process and add the entered text.
   *
   * @param {Object} e - The keyboard event.
   */
  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddText();
    }
  };

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isMentor = userData.userType;

  /**
   * renderContent
   *
   * Determines how the content (data) should be displayed based on the specified topic.
   * Renders each sentence as a new line. If the topic is 'Resources', it renders them as
   * hyperlinks.
   *
   * @returns {ReactNode} - The rendered content.
   */
  const renderContent = () => {
    if (text === "Resource") {
      const links = dataAsString.split("{}");
      return (
        <div>
          {links.map((link, index) => (
            <a
              style={{ marginLeft: "4px" }}
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
      const sentences = dataAsString.split(/[.?]/);
      return sentences.map((sentence, index) => (
        <p
          className="activitesText"
          key={index}
          style={{ display: "flex", alignItems: "center" }}
        >
          {sentence.trim() !== "" ? (
            Topic === "Discussion Questions" ? (
              <BulletImage />
            ) : (
              "•"
            )
          ) : null}
          <span style={{ marginLeft: "4px" }}>
            {` ${sentence.trim()}`}
            {sentence.trim() !== ""
              ? Topic === "Discussion Questions"
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
        {Topic !== "Resources" && <h3 className="Act-H">{Topic}</h3>}
        {Topic === "Resources" && <br></br>}
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
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
            {renderContent()}
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownBar;
