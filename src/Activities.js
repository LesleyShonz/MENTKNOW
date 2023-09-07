import React, { useState } from "react";
import "./Activities.css"; // Import your CSS file

const Activities = ({ activityName }) => {
  const [content1, setContent1] = useState(""); // State for content of subcontainer 1
  const [content2, setContent2] = useState(""); // State for content of subcontainer 2
  console.log("ActivitiesTest");
  return (
    <>
      <div className="main-container">
        <h2>{activityName}</h2>
        <div className="sub-container">
          <h3 className="Act-H">Discussion Questions</h3>
          <div
            className="editable"
            contentEditable="true"
            onInput={(e) => setContent1(e.target.textContent)}
          >
            {content1}
          </div>
        </div>
        <div className="sub-container">
          <h3 className="Act-H">Activities</h3>
          <div
            className="editable"
            contentEditable="true"
            onInput={(e) => setContent2(e.target.textContent)}
          >
            {content2}
          </div>
        </div>
      </div>
    </>
  );
};

export default Activities;
