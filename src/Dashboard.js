import React, { useState, useContext, useEffect } from 'react';
import UserContext from './UserContext';
import axios from 'axios';
import './Dashboard.css';
import mentknowlogo from './icons/mentknowlogo.svg'
import signout_logo from './icons/Sign_out_squre_light.svg'
import frame from './icons/Frame.svg'
import lamp from './icons/lamp-2 1.svg'
import goal from './icons/goal 1.svg'
import time from './icons/save-time 1.svg'
import brain from './icons/human-brain 1.svg'
import stress from './icons/6819628 2.svg'
import magistrate from './icons/magistrate 2.svg'
import calender from './icons/Calendar_add_light.svg';

// Base URL constant. Consider using environment variables for different environments.
const BASE_URL = 'http://localhost:5004/api/users';

/**
 * Utility function to compute the next three Friday dates.
 */
function getNextThreeFridays() {

    const today = new Date();
    const fridays = [];
    let daysUntilNextFriday = 5 - today.getDay();

    if (daysUntilNextFriday <= 0) daysUntilNextFriday += 7;

    for (let i = 0; i < 3; i++) {
        const nextFriday = new Date(today);
        nextFriday.setDate(today.getDate() + daysUntilNextFriday + (7 * i));
        fridays.push(nextFriday);
    }

    return fridays;
}

/**
 * Activity Component - Represents individual activity with an icon, name, and date.
 */
function Activity({ icon, name, date }) {
    return (
        <div className='awareness-container'>
            <img className='all-image-icons-style' src={icon} alt={name} />
            <h2 className='activity-name'>{name}</h2>
            <img className='calender-image-icons' src={calender} alt='Calendar' />
            <h3 className='date-style'>{date}</h3>
            <button className='button-to-activity-style'>View Activity</button>
        </div>
    );
}

/**
 * Main Dashboard Component.
 */
function Dashboard() {
    // Using React's Context API to get the user details
    const { user } = useContext(UserContext);
    // useState hooks for managing component's local state
    const [members, setMembers] = useState([]);
    const [mentor, setMentor] = useState(null);
    const [fridays, setFridays] = useState([]);
    const [error, setError] = useState(null);
    const mentorName = ''
    const mentorSurname = '';

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
                    groupNumber: user.groupNumber,
                    userEmail: user.email
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
                    groupNumber: user.groupNumber,
                    userEmail: user.email
                });



                setMentor(response.data);
                console.log(mentorName);
            } catch (error) {
                setError("Error fetching mentor.");
                console.error("Error fetching mentor:", error);
            }
        };

        // Make API calls only if user details are available
        if (user && user.email && user.groupNumber) {
            fetchMentees();
            fetchMentor();
        }
    }, [user]);

    // Generate a random color for UI purposes
    const randomColor = getRandomColor();

    /**
     * Utility function to generate a random color.
     */
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    /**
     * Utility function to get the initials from a given name and surname.
     */
    const getInitials = (name = '', surname = '') => {
        return name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
    };


    return (

        <div className='whole-dashboard-container'>
            <div className='left-container'>
                <img className='logo-dashboard' src={mentknowlogo} alt="MentKnow Logo" />
                <div className='logout-style'>
                    <img className='signout-image-container' src={signout_logo} alt='Sign out' />
                    <h1 className='logout-text-stye'>Log Out</h1>
                </div>
            </div>

            <div className='middle-container'>
                <div className='middle-header'>
                    <img src={frame} className='middle-logo' alt="Frame Logo" />
                    <div>
                        <h1 className='hello-container'> Hello {'Sizwe'}!</h1>
                        <p1 className='hello-container-subline'>It's good to see you again.</p1>
                    </div>
                </div>

                <h1 className='activities-header'>Activities</h1>


                <div className='awareness-container'>
                    <img className='all-image-icons-style' src={lamp} alt='' />
                    <h1 className='activity-name'>Awareness</h1>
                    <img className='calender-image-icons' src={calender} alt='' />
                    <h2 className='date-style'>15/09/2023</h2>
                    <button className='button-to-activity-style'>View Activity</button>
                </div>
                <div className='all-others-container'>
                    <img className='all-image-icons-style' src={goal} alt='' />
                    <h1 className='activity-name'>Goal Setting</h1>
                    <img className='calender-image-icons1' src={calender} alt='' />
                    <h2 className='date-style'>22/09/2023</h2>
                    <button className='button-to-activity-style'>View Activity</button>
                </div>
                <div className='all-others-container'>
                    <img className='all-image-icons-style' src={time} alt='' />
                    <h1 className='activity-name'>Time Management</h1>
                    <img className='calender-image-icons2' src={calender} alt='' />
                    <h2 className='date-style'>29/09/2023</h2>
                    <button className='button-to-activity-style'>View Activity</button>
                </div>
                <div className='all-others-container'>
                    <img className='all-image-icons-style' src={brain} alt='' />
                    <h1 className='activity-name'>Study Skills</h1>
                    <img className='calender-image-icons3' src={calender} alt='' />
                    <h2 className='date-style'>06/10/2023</h2>
                    <button className='button-to-activity-style'>View Activity</button>
                </div>
                <div className='all-others-container'>
                    <img className='all-image-icons-style' src={stress} alt='' />
                    <h1 className='activity-name'>Stress Management</h1>
                    <img className='calender-image-icons4' src={calender} alt='' />
                    <h2 className='date-style'>13/10/2023</h2>
                    <button className='button-to-activity-style'>View Activity</button>
                </div>
                <div className='all-others-container'>
                    <img className='all-image-icons-style' src={magistrate} alt='' />
                    <h1 className='activity-name'>Exam Preparation</h1>
                    <img className='calender-image-icons5' src={calender} alt='' />
                    <h2 className='date-style'>20/10/2023</h2>
                    <button className='button-to-activity-style'>View Activity</button>
                </div>

            </div>

            <div className='right-container'>
                <div className='right-top-container'>
                    <h1 className='right-top-title'> Upcoming Sessions</h1>
                    <div>
                        {fridays.map((friday, index) => (
                            <div key={index}>
                                <img className='top-right-icons' src={calender} />
                                <span className='date-text'>Friday, {friday.toLocaleDateString()}, 13:00 PM </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className='mentor-container-header'>My Mentor</h2>
                    {mentor ? (
                        <div className="mentor-container">
  
                                <span className="initials-container">{getInitials(mentor.name, mentor.surname)}</span>
                        
                            <h1 className='mentor-name-component'>
                                {mentor.name} {mentor.surname}
                            </h1>
                        </div>
                    ) : (

                        <span className="mentor-container">
                            <div className="mentor-not-available">
                                Mentor currently not assigned
                            </div>

                        </span>
                    )}
                </div>

                <div>
                    {error && <p className="error-message">{error}</p>}
                    {members.map((member, index) => (
                        <div className="mentees-container">
                            <div key={index} className="member-rectangle">
                                <span className="initials-container">{getInitials(member.name, member.surname)}</span>
                                {member.name} {member.surname}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
