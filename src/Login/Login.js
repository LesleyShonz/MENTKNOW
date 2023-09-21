/**
 * Login Component
 *
 * Provides a login form for users to authenticate.
 * - Handles form validation (both frontend validation and backend validation responses).
 * - Uses the UserContext to set the authenticated user.
 * - Uses react-router-dom's navigate to redirect based on user type.
 * - Provides feedback to the user on authentication failures.
 *
 * Dependencies:
 * - React useState and useContext hooks
 * - axios for API calls
 * - useNavigate from 'react-router-dom' for navigation
 * - Local CSS for styling
 * - Icons for UI feedback
 */
import React, { useState, useContext } from 'react';
import UserContext from '../Whiteboard/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import erro from '../icons/exclamation 6.svg';
import mentknowlogo from '../icons/mentknowlogo.svg';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { email, password } = formData;

  /**
   * Handles input field changes and updates formData state.
   */
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Redirects the user to the appropriate dashboard based on their user type.
   */
  const navigateUser = (userType) => {
    navigate(userType === 'mentee' ? '/dashboard' : '/MentorDashboard');
  };

  /**
   * Redirects the user to the registration page.
   */
  const handleMoveToRegister = () => {
    navigate('/register');
  }

  /**
   * Handles form submission:
   * - Performs frontend validation
   * - Sends a POST request to the backend with user login data
   * - Handles backend validation errors
   * - On successful login, redirects user to the appropriate dashboard
   */
  const onSubmit = async e => {
    e.preventDefault();

    // Reset errors before any validation.
    setErrors({});

    // Simple Frontend validation
    if (!email) setErrors(prevErrors => ({ ...prevErrors, email: 'Incorrect email address. Please try again.' }));
    if (!password || password.length < 6) setErrors(prevErrors => ({ ...prevErrors, password: 'Password must be at least 6 characters long.' }));
    if (!email || !password || password.length < 6) return;

    setLoading(true);

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const body = JSON.stringify({ email, password });
      const res = await axios.post('http://localhost:5004/api/users/login', body, config);

      setLoading(false);

      if (res.status === 200) {
        localStorage.setItem('userData', JSON.stringify(res.data));
        setUser(res.data);
        navigateUser(res.data.userType);
      }

    } catch (error) {
      setLoading(false);

      const errorMessage = error.response && error.response.data.errors
        ? error.response.data.errors[0].msg
        : error.message;

      if (errorMessage === "Incorrect email address. Please try again") {
        setErrors(prevErrors => ({ ...prevErrors, email: errorMessage }));
      } else if (errorMessage === "Incorrect password. Please try again") {
        setErrors(prevErrors => ({ ...prevErrors, password: errorMessage }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, general: `Error: ${errorMessage}` }));
      }
    }
  };
  return (
    <div className="container1">

      <div className="image-container1">
        <img src={mentknowlogo} alt="MentKnow Logo" />
      </div>
      <div className='login-container'>
        <h2 className='SignInText1'>Sign In</h2>
        <form onSubmit={onSubmit}>
          <div className='some-style'>
            <p className='UserNameText1'>Email Address</p>
            {errors.email && <div className='error-message112'><img src={erro} alt='error' className='error-style' /> {errors.email} </div>}
          </div>
          <input
            className='userNameForm1'
            type="email"
            name="email"
            value={email}
            onChange={onChange}
          />

          <div className='some-style'>
            <label className='password-label1'>Password</label>
            {errors.password && <div className='error-message112'><img src={erro} alt='error' className='error-style' /> {errors.password}</div>}
          </div>
          <input
            className='password-form1'
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />


          {loading && <div style={{ marginTop: '13px', marginLeft: '340px' }} className='loading-ball'></div>}

          <button className='login-button1' type="submit">Sign In</button>
          <a className='link-register1' onClick={handleMoveToRegister}> Don’t have an account? Sign Up here </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
