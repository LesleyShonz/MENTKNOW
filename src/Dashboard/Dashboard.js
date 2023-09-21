/**
 * Dashboard Component for MentKnow Application.
 * This component serves as the primary user interface after logging in,
 * displaying user information, upcoming events, and other relevant details.
 *
 * @author: Sizwe Nkosi
 * @colaborators :Chloe Walt and Lesley Shonhiwa
 * @version: 1.1
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
import { useEditor } from "@tldraw/tldraw";

// Constants
const BASE_URL = "http://localhost:5004/api/users";

/**
 * Computes the next three Fridays from the current date.
 * 
 * @returns {Date[]} An array containing dates of the next three Fridays.
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
 * Main dashboard component, encapsulating various sub-components and utilities.
 * This component displays a comprehensive view of user details, upcoming events,
 * affiliated mentor and mentees, as well as the daily quote/affirmation.
 * 
 * @returns {JSX.Element} The rendered MentorDashboard component.
 */
const Dashboard = () => {
  // ... (pre-existing useState declarations and useEffect hooks)
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
  const editor = useEditor();

  /**
   * Effect hook to compute and set the upcoming three Fridays from the current date.
   */
  useEffect(() => {
    setFridays(getNextThreeFridays());
  }, []);

  /**
   * Effect hook to fetch associated group members and mentor for the logged-in user.
   */

  useEffect(() => {
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

  /**
   * Effect hook to generate and assign unique colors to group members for UI differentiation.
   */
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
   * Utility function to generate a random color.
   */
  function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  }

  /**
   * Effect hook to generate and assign unique colors to group members for UI differentiation.
   */
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
   * Utility function to get the initials from a given name and surname.
   */
  const getInitials = (name = "", surname = "") => {
    return name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
  };
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);


  /**
   * Fetches a random quote for daily affirmation and sets it in the state.
   */
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

  /**
   * Handles the user logout process, removing their session and redirecting to sign-in.
   */
  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/signin");
  };

  /**
   * Handles the action when a user clicks to view an activity.
   * 
   * @param {string} pageName - Name of the activity page to navigate to.
   */
  const handleViewActivityClick = (pageName) => {
    setPageName(pageName); // Set the pageName to the activity name
    setIsActivityClicked(!isActivityClicked);
    navigate("/Whiteboard", { state: { pageName } });
  };
  return (
    <div className="whole-dashboard-container">
      <div className="left-container">
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
          <h1 className="logout-text-stye" onClick={logout}>
            Log Out
          </h1>
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
        <p className="activity-topics-style">Activity Topics</p>
        <div className="awareness-container">
          <img className="all-image-icons-style" src={lamp} alt="" />
          <h1 className="activity-name">Awareness</h1>
          <img className="calender-image-icons" src={calender} alt="" />
          <h2 className="date-style">15/09/2023</h2>
          <h1
            type="button"
            className="button-to-activity-style"
            onClick={() => handleViewActivityClick("Awareness")}
          >
            View Activity
          </h1>
        </div>
        <div className="all-others-container">
          <span className="all-image-icons-stye-outer">
            <img className="all-image-icons-style" src={goal} alt="" />
          </span>
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
        <div>
          <h2 className="mentor-container-header">My Mentor</h2>
          {mentor && mentor.length > 0 ? (
            <div className="mentor-container">
              <div
                className="initial-outer-container"
                style={{ backgroundColor: '#F39F18' }}
              >
                <span className="initials-container">
                  <div className="initials-container-style">
                    {getInitials(mentor[0].name, mentor[0].surname)}
                  </div>
                </span>
              </div>
              <h1 className="mentor-name-component">
                {mentor[0].name} {mentor[0].surname}
              </h1>
            </div>
          ) : (
            <span className="mentor-container">
              <div >
                Mentor currently not assigned
              </div>
            </span>
          )}
        </div>

        <h1 className="group-heading-container">
          Group {userData.groupNumber} peers{" "}
        </h1>
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
              <div className="loading-ball"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
