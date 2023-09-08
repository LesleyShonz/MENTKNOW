import React, { useState, useRef } from "react";
import "./Activities.css";
import Discussion from "./assets/Discussion.svg";
import TopicIcon from "./assets/Topic_icon.png";
import DropdownBar from "./DropdownBar";
import axios from "axios";
import { useEffect } from "react";
const Activities = ({
  activityName,
  isResourcesClicked,
  isDiscussionClicked,
}) => {
  const [discussionData, setDiscussionData] = useState(null);

  return (
    <>
      {isDiscussionClicked && (
        <div className="main-container">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={TopicIcon} alt="TopicIcon" />

            <h2>{activityName}</h2>
          </div>
          {/* Display discussion data */}
          {discussionData && (
            <div className="discussion-data">
              {/* Render discussion data here */}
              <p>{discussionData.field1}</p>
              <p>{discussionData.field2}</p>
              {/* Add more fields as needed */}
            </div>
          )}

          <DropdownBar
            Topic="Discussion Question"
            QuestionsTags={true}
            text="Question"
          />

          <DropdownBar
            activityName={activityName}
            Topic="Activities"
            QuestionsTags={false}
            text="Activity"
          />
        </div>
      )}
      {isResourcesClicked && (
        <div className="resources-container">
          <DropdownBar
            activityName={activityName}
            Topic="Resources"
            QuestionsTags={false}
            text="Resource"
          />
        </div>
      )}
    </>
  );
};

export default Activities;
