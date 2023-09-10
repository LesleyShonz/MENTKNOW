import '../Dashboard/Dashboard.css';
import mentknowlogo from '../icons/mentknowlogo.svg';
import { useNavigate } from 'react-router-dom';
import signout_logo from '../icons/Sign_out_squre_light.svg';
import './Analytics.css';
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
            <div className='middle-container'>
                <div className='Analytics-middle-container'>
                    <h1 className='hello-container1'>Mentee Analytics Dashboard</h1>
                    <p1 className='hello-container-subline1'>Activity stats description.</p1>
                </div>
            </div>



        </div>
    );


}

export default Analytics;
