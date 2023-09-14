import '../Dashboard/Dashboard.css';
import mentknowlogo from '../icons/mentknowlogo.svg';
import { useNavigate } from 'react-router-dom';
import signout_logo from '../icons/Sign_out_squre_light.svg';
import './Analytics.css';
import BarChart from './BarChart';
import PieChart from './PieChart';
function Analytics() {
    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const logout = () => {
        localStorage.removeItem('userData');
        navigate('/signin');
    };

    return (
        <div className="whole-dashboard-container">

            <div className='left-container' onClick={logout}>
                <img className='logo-dashboard' src={mentknowlogo} alt="MentKnow Logo" />
                <div className='logout-style'>
                    <img className='signout-image-container' src={signout_logo} alt='Sign out' />
                    <h1 className='logout-text-stye'>Log Out</h1>
                </div>
            </div>


            <div className='right-container'>


                <div className='Analytics-middle-container'>

                    <div className='mentor-header-heading-outer'>
                        <div className='mentor-header-heading-inner'>
                            <h1 className='mentee-text-style'>Mentee Analytics Dashboard</h1>
                        </div>
                    </div>
                    
                    <PieChart />
                    <BarChart />

                </div>



            </div>



        </div>
    );


}

export default Analytics;
