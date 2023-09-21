/**
 * MentorDashboard Component
 * 
 * Overview:
 * --------
 * The MentorDashboard component is a primary user interface for the MentKnow Application post-login.
 * It presents a collection of features and data such as:
 * - Activities for mentors with associated dates
 * - A list of mentees associated with the logged-in mentor
 * - Upcoming sessions, specifically highlighting the next three Fridays
 * - A daily affirmation quote fetched from an external API
 * 
 * The component provides various user interactions including:
 * - Viewing details of specific activities
 * - Navigation to the analytics page
 * - Logging out of the application
 * 
 */

// imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import mentknowlogo from "../icons/mentknowlogo.svg";
import signout_logo from "../icons/Sign_out_squre_light.svg";
import frame from "../icons/Frame.svg";
import lamp from "../icons/lamp-2 1.svg";
import goal from "../icons/goal 1.svg";
import time from "../icons/save-time 1.svg";
import brain from "../icons/human-brain 1.svg";
import stress from "../icons/6819628 2.svg";
import magistrate from "../icons/magistrate 2.svg";
import calender from "../icons/Calendar_add_light.svg";
import lineup from "../icons/Line_up.svg";

// Constants
const BASE_URL = "http://localhost:5004/api/users";

/**
 * Calculate the next three Friday dates from today's date.
 *
 * @returns {Array} An array of the next three Friday dates.
 */
const getNextThreeFridays = () => {
  const today = new Date();
  const fridays = [];
  let daysUntilNextFriday = 5 - today.getDay();
  if (daysUntilNextFriday <= 0) daysUntilNextFriday += 7;
  for (let i = 0; i < 3; i++) {
    const nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + daysUntilNextFriday + 7 * i);
    fridays.push(nextFriday);
  }
  return fridays;
};

/**
 * Individual activity component.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.icon - Path to the icon for the activity.
 * @param {string} props.name - Name of the activity.
 * @param {Date} props.date - Date of the activity.
 * @returns {JSX.Element} Rendered activity component.
 */
function Activity({ icon, name, date }) {
  return (
    <div className="awareness-container">
      <img className="all-image-icons-style" src={icon} alt={name} />
      <h2 className="activity-name">{name}</h2>
      <img className="calender-image-icons" src={calender} alt="Calendar" />
      <h3 className="date-style">{date}</h3>
      <button className="button-to-activity-style">View Activity</button>
    </div>
  );
}

/**
 * Primary dashboard component, showcasing mentor activities, 
 * upcoming sessions, mentees, and daily affirmations.
 *
 * @returns {JSX.Element} Rendered dashboard component.
 */
const MentorDashboard = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [pageName, setPageName] = useState(null);
  const [isActivityClicked, setIsActivityClicked] = useState(false);
  const [members, setMembers] = useState([]);
  const [mentor, setMentor] = useState([]);
  const [fridays, setFridays] = useState([]);
  const [error, setError] = useState(null);
  const mentorName = "";
  const mentorSurname = "";
  const navigate = useNavigate();

  // useEffect to set the next three fridays on component mount
  useEffect(() => {
    setFridays(getNextThreeFridays());
  }, []);

  // useEffect to fetch the mentees and mentor for the logged-in user on component mount/update
  useEffect(() => {
    // Fetch the group members (mentees) associated with the user
    const fetchMentees = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/group-members`, {
          groupNumber: userData.groupNumber,
          userEmail: userData.email,
        });
        setMembers(response.data);
      } catch (error) {
        setError("Error fetching group members.");
        console.error("Error fetching group members:", error);
      }
    };

    // Fetch the mentor associated with the user
    const fetchMentor = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/group-mentor`, {
          groupNumber: userData.groupNumber,
          userEmail: userData.email,
        });

        setMentor(response.data);
      } catch (error) {
        setError("Error fetching mentor.");
        console.error("Error fetching mentor:", error);
      }
    };

    // Make API calls only if user details are available
    if (userData && userData.email && userData.groupNumber) {
      fetchMentees();
      fetchMentor();
    }
  }, [userData]);
  const [colors, setColors] = useState({});

  useEffect(() => {
    const newColors = { ...colors };
    members.forEach((item) => {
      if (!newColors[item.id]) {
        newColors[item.id] = getRandomColor();
      }
    });
    setColors(newColors);
  }, [members]);

  /**
   * Generate a random color.
   *
   * @returns {string} A random hex color.
   */
  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  // This effect handles the assignment of colors to members.
  useEffect(() => {
    const newColors = { ...colors };
    members.forEach((member) => {
      if (!newColors[`${member.name}${member.surname}`]) {
        newColors[`${member.name}${member.surname}`] = getRandomColor();
      }
    });
    setColors(newColors);
  }, [members]);

  /**
   * Get the initials from a name and surname.
   *
   * @param {string} name - First name of the user.
   * @param {string} surname - Surname of the user.
   * @returns {string} Initials based on the name and surname.
   */
  const getInitials = (name = "", surname = "") => {
    return name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
  };
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setQuote({
          content: data.content,
          author: data.author,
        });
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/signin");
  };
  //Take user to whiteboard
  const handleViewActivityClick = (pageName) => {
    setPageName(pageName); // Set the pageName to the activity name
    setIsActivityClicked(!isActivityClicked);
    //pass page name to Whiteboard interface
    navigate("/Whiteboard", { state: { pageName } });
  };

  const handleMoveToAnalytics = () => {
    navigate("/Analytics");
  };
  return (
    <div className="whole-dashboard-container">
      <div className="left-container" onClick={logout}>
        <img
          className="logo-dashboard"
          src={mentknowlogo}
          alt="MentKnow Logo"
        />
        <div className="logout-style">
          <img
            className="signout-image-container"
            src={signout_logo}
            alt="Sign out"
          />
          <h1 className="logout-text-stye">Log Out</h1>
        </div>
      </div>

      <div className="middle-container">
        <div className="middle-header">
          <img src={frame} className="middle-logo" alt="Frame Logo" />
          <div>
            <h1 className="hello-container"> Hello {userData.name}!</h1>
            <p1 className="hello-container-subline">
              It's good to see you again.
            </p1>
          </div>
        </div>

        <h1 className="activities-header">Activities</h1>
        <p1 className='activity-topics-style'>Activity Topics</p1>
        <div className="awareness-container">
          <img className="all-image-icons-style" src={lamp} alt="" />
          <h1 className="activity-name">Awareness</h1>
          <img className="calender-image-icons" src={calender} alt="" />
          <h2 className="date-style">15/09/2023</h2>
          <h1
            className="button-to-activity-style"
            onClick={() => handleViewActivityClick("Awareness")}
          >
            View Activity
          </h1>
        </div>
        <div className="all-others-container">
          <img className="all-image-icons-style" src={goal} alt="" />
          <h1 className="activity-name">Goal Setting</h1>
          <img className="calender-image-icons1" src={calender} alt="" />
          <h2 className="date-style">22/09/2023</h2>
          <h1
            className="button-to-activity-style"
            onClick={() => handleViewActivityClick("Goal Setting")}
          >
            View Activity
          </h1>
        </div>
        <div className="all-others-container">
          <img className="all-image-icons-style" src={time} alt="" />
          <h1 className="activity-name">Time Management</h1>
          <img className="calender-image-icons2" src={calender} alt="" />
          <h2 className="date-style">29/09/2023</h2>
          <h1
            className="button-to-activity-style"
            onClick={() => handleViewActivityClick("Time Management")}
          >
            View Activity
          </h1>
        </div>
        <div className="all-others-container">
          <img className="all-image-icons-style" src={brain} alt="" />
          <h1 className="activity-name">Study Skills</h1>
          <img className="calender-image-icons3" src={calender} alt="" />
          <h2 className="date-style">06/10/2023</h2>
          <h1
            className="button-to-activity-style"
            onClick={() => handleViewActivityClick("Study Skills")}
          >
            View Activity
          </h1>
        </div>
        <div className="all-others-container">
          <img className="all-image-icons-style" src={stress} alt="" />
          <h1 className="activity-name">Stress Management</h1>
          <img className="calender-image-icons4" src={calender} alt="" />
          <h2 className="date-style">13/10/2023</h2>
          <h1
            className="button-to-activity-style"
            onClick={() => handleViewActivityClick("Stress Management")}
          >
            View Activity
          </h1>
        </div>
        <div className="all-others-container">
          <img className="all-image-icons-style" src={magistrate} alt="" />
          <h1 className="activity-name">Exam Preparation</h1>
          <img className="calender-image-icons5" src={calender} alt="" />
          <h2 className="date-style">20/10/2023</h2>
          <h1
            className="button-to-activity-style"
            onClick={() => handleViewActivityClick("Exam Preparation")}
          >
            View Activity
          </h1>
        </div>
      </div>

      <div className="right-container">
        <div className="right-top-container">
          <h1 className="right-top-title"> Upcoming Sessions</h1>
          <div>
            {fridays.map((friday, index) => (
              <div key={index}>
                <img className="top-right-icons" src={calender} />
                <span className="date-text">
                  Friday, {friday.toLocaleDateString()}, 13:00 PM{" "}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* This is the mentor component */}

        <h1 className="group-heading-container">
          Group {userData.groupNumber} mentees{" "}
        </h1>

        <div className="analytics-style" onClick={handleMoveToAnalytics}>
          <img src={lineup} alt="lineup" className="image-analytics-mentor" />
          <h1 className="analytics-heading-text">View Statistics</h1>
        </div>
        <div>
          {members.map((member, index) => (
            <div key={index} className="mentees-container">
              <div
                className="mentees-initials-container"
                style={{ backgroundColor: colors[`${member.name}${member.surname}`] || "#FFF" }}
              >
                <div className="initials-container">
                  <div className="initials-container-style">
                    {getInitials(member.name, member.surname)}
                  </div>
                </div>
              </div>
              <div className="mentees-names-style">
                {member.name} {member.surname}
              </div>
            </div>
          ))}
        </div>

        <div className="affirmation-container">
          <h1 className="affirmation-header">Today’s Affirmation</h1>
          <div className="quotes-style">
            {quote ? (
              <blockquote>
                "{quote.content}"<footer>— {quote.author}</footer>
              </blockquote>
            ) : (
              <div>Loading quote...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
