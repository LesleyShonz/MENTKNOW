/**
 * Activities Component
 *
 * This component provides an interface to view discussions, activities, and resources
 * associated with a given activity name.
 *
 * Props:
 * - `activityName` (string): The name of the current activity (e.g., "Awareness").
 * - `isResourcesClicked` (boolean): Determines if the resources section should be displayed.
 * - `isDiscussionClicked` (boolean): Determines if the discussions and activities sections should be displayed.
 *
 * State:
 * - `discussionData` (array): Holds the discussion data for the current activity.
 * - `activitiesData` (array): Holds the activities data for the current activity.
 * - `resourcesData` (array): Holds the resources data for the current activity.
 *
 * API Endpoint:
 * The component fetches data from the "http://localhost:5004/api/activities/activities" endpoint.
 *
 * @component
 */
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
  // Mapping of activity names to their icons
  const activityNameToIcon = {
    Awareness: Awareness,
    Goal: Goal,
    Time: Time,
    Study: Study,
    Stress: Stress,
    Exam: Exam,
  };
  useEffect(() => {
    /**
     * Fetches activity data based on the provided activity name.
     * After fetching, it updates the state variables `discussionData`,
     * `activitiesData`, and `resourcesData` accordingly.
     */
    axios
      .get(`http://localhost:5004/api/activities/activities`)
      .then((response) => {
        const allData = response.data;
        console.log(response.data);
        if (typeof allData === "object") {
          const specificActivity = allData.find(
            (activity) => activity.activityName === activityName
          );

          if (specificActivity) {
            setDiscussionData(specificActivity.discussion || []);
            setActivitiesData(specificActivity.activities || []);
            setResourcesData(specificActivity.resources || []);
          } else {
            console.error("Activity not found");
          }
        } else {
          console.error("Invalid data format from the API");
  
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
          <h3 className="Act-H">Resources</h3>
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
