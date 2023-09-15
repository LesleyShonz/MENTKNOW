import '../Dashboard/Dashboard.css';
import React, { useRef, useEffect, useState } from 'react';
import mentknowlogo from '../icons/mentknowlogo.svg';
import { useNavigate } from 'react-router-dom';
import signout_logo from '../icons/Sign_out_squre_light.svg';
import dashboard from '../icons/Arrow_left_light.svg';
import './Analytics.css';
import BarChart from './BarChart';
import PieChart from './PieChart';
import ScatterPlot from './ScatterPlotter';
function Analytics() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [totalContributions, setTotalContributions] = useState(null);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [totalMentees, setTotalMentees] = useState(0);
    const [totalContributionsSum, setTotalContributionsSum] = useState(0);

    const logout = () => {
        localStorage.removeItem('userData');
        navigate('/signin');
    };

    const mentorDashboardHandle = () => {

        navigate('/mentorDashboard');
    }

    useEffect(() => {
        fetch('http://localhost:5004/api/analytics')
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5004/api/totalContributions')
            .then(response => response.json())
            .then(data => setTotalContributionsSum(data.totalContributions))
            .catch(error => console.error('Error fetching total contributions:', error));
    }, []);

    //most contrivution by Number of contributions
    const maxContributionActivity = data.reduce((maxActivity, currentActivity) => {
        return currentActivity.numContributions > maxActivity.numContributions ? currentActivity : maxActivity;
        set

    }, data[0]);

    //highest number of ratings
    const maxRatingsActivity = data.reduce((maxActivity, currentActivity) => {
        return currentActivity.averageRating > maxActivity.averageRating ? currentActivity : maxActivity;
    }, data[0]); // initialize with the first activity

    useEffect(() => {
        fetch('http://localhost:5004/api/users/total-mentees-count')
            .then(response => response.json())
            .then(data => {

                setTotalMentees(data.menteeCount)
            });

    }, []);

    // const current = maxContributionActivity;
    var averageContrubution = 0;
    if (totalMentees > 0 && totalContributionsSum > 0) {

        averageContrubution = totalContributionsSum / totalMentees;
        averageContrubution = parseFloat(averageContrubution.toFixed(2))

    }
    return (
        <div className="whole-dashboard-container2">

            <div className='left-container'>
                <img className='logo-dashboard' src={mentknowlogo} alt="MentKnow Logo" />
                <div className='logout-style' onClick={logout}>
                    <img className='signout-image-container' src={signout_logo} alt='Sign out' />
                    <h1 className='logout-text-stye'>Log Out</h1>
                </div>
            </div>


            <div className='right-container1'>

                <div className='move-back-container' onClick={mentorDashboardHandle}>

                    <img className='dashboard-image-container' src={dashboard} alt='Sign out' />
                    <p className='go-to-dashboard-text'>Dashboard</p>

                </div>
                <div className='Analytics-middle-container'>

                    <div className='mentor-header-heading-outer1'>
                        <div className='mentor-header-heading-inner1'>
                            <h1 className='mentee-text-style'>Mentee Analytics Dashboard</h1>
                        </div>
                    </div>
                    <div className='top-row'>
                        <div className='top-left-stat-container'>
                            <div className='upper-part-row-style'>

                                <div className='top-left-style'>
                                    {
                                        maxRatingsActivity && (
                                            <h1 className='top-left-tile-text-header'>

                                                {maxRatingsActivity.activityName}</h1>
                                        )
                                    }
                                    <p className='top-left-tile-text-paragraph'>Most Popular</p>
                                </div>
                                <div className='top-right-style'>

                                    {
                                        maxContributionActivity && (

                                            <h1 className='top-left-tile-text-header'>

                                                {maxContributionActivity.activityName}</h1>


                                        )

                                    }
                                    <p className='top-left-tile-text-paragraph'>Most Contributions</p>

                                </div>
                            </div>

                            <div className='upper-part-row-style'>
                                <div className='bottom-left-style'>
                                    <div className='mentee-count-container-seperator'>
                                        <h1 className='total-mentees-count-style'>
                                            {averageContrubution}
                                        </h1>

                                        <div>
                                            <p className='mentee-para'>Contribution per</p>
                                            <p className='mentee-para1'>Mentee on Avg.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='bottom-right-style'>
                                    {
                                        (
                                            <div className='mentee-count-container-seperator'>
                                                <h1 className='total-mentees-count-style'>
                                                    {totalMentees}
                                                </h1>

                                                <div>
                                                    <p className='mentee-para'>Mentees in the</p>
                                                    <p className='mentee-para1'>Program</p>
                                                </div>
                                            </div>
                                        )

                                    }
                                </div>

                            </div>
                        </div>

                        <PieChart />
                    </div>
                    <div className='upper-part-row-style'>
                        <BarChart />
                        <ScatterPlot />
                    </div>
                </div>

            </div>



        </div>
    );


}

export default Analytics;
