import React, { useState, useRef } from "react";
import "./Activities.css";

import DropdownBar from "./DropdownBar";
import axios from "axios";
import { useEffect } from "react";
import Awareness from "../assets/Awareness.svg";
import Goal from "../assets/goals.svg";
import Time from "../assets/time.svg";
import Study from "../assets/study.svg";
import Stress from "../assets/stress.svg";
import Exam from "../assets/Exam.svg";
const Activities = ({
  activityName,
  isResourcesClicked,
  isDiscussionClicked,
}) => {
  const [discussionData, setDiscussionData] = useState([]);
  const [activitiesData, setActivitiesData] = useState([]);
  const [resourcesData, setResourcesData] = useState([]);
  const activityNameToIcon = {
    Awareness: Awareness,
    Goal: Goal,
    Time: Time,
    Study: Study,
    Stress: Stress,
    Exam: Exam,
  };
  useEffect(() => {
    // Fetch all activities when the component mounts
    axios
      .get(`http://localhost:5004/api/activities/activities`)
      .then((response) => {
        const allData = response.data;
        console.log(response.data);
        if (typeof allData === "object") {
          // Find the specific activity by its name
          const specificActivity = allData.find(
            (activity) => activity.activityName === activityName
          );

          if (specificActivity) {
            // Set the data for the specific activity
            setDiscussionData(specificActivity.discussion || []);
            setActivitiesData(specificActivity.activities || []);
            setResourcesData(specificActivity.resources || []);
          } else {
            console.error("Activity not found");
            // Handle the case when the activity is not found
          }
        } else {
          console.error("Invalid data format from the API");
          // Handle the case when the data format is unexpected
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [activityName]);

  return (
    <>
      {isDiscussionClicked && (
        <div className="main-container">
          {/* Display discussion data */}
          <h1 className="TopicName">
            <img
              className="icon-H"
              src={activityNameToIcon[activityName.split(" ")[0]]}
              alt="TopicIcon"
            />
            {activityName}
          </h1>

          <DropdownBar
            activityName={activityName}
            Topic="Discussion Questions"
            QuestionsTags={true}
            text="Question"
            data={discussionData}
          />

          <DropdownBar
            activityName={activityName}
            Topic="Activities"
            QuestionsTags={false}
            text="Activity"
            data={activitiesData}
          />
        </div>
      )}
      {isResourcesClicked && (
        <div className="resources-container">
          {/* Display resources data */}

          <DropdownBar
            activityName={activityName}
            Topic="Resources"
            QuestionsTags={false}
            text="Resource"
            data={resourcesData}
          />
        </div>
      )}
    </>
  );
};

export default Activities;
