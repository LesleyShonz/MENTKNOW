import React, { useState, useContext, Link  } from 'react';
import UserContext from './UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import mentknowlogo from './icons/mentknowlogo.svg'


const Login = ({ setAuthenticated }) => {
  const { setUser } = useContext(UserContext);
  // Use React Router's "useNavigate" hook to programmatically redirect the user
  const navigate = useNavigate();

  // useState to manage form fields data
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });



  // useState to manage potential error messages
  const [error, setError] = useState('');

  const { email, password } = formData;

  // Event handler for input change, updating form data state
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Event handler for form submission
  const onSubmit = async e => {
    e.preventDefault();

    // Clear previous error messages
    setError('');

    // Configuration for axios POST request (Header to define content type)
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      // Convert form data to JSON string format
      const body = JSON.stringify({ email, password });

      // Perform POST request to server to attempt login
      const res = await axios.post('http://localhost:5009/api/users/login', body, config);

      // If response contains a token, it means login was successful
      if (res.data) {
        // Save the received token to local storage
        setUser(res.data);
        // Set the token for all future Axios requests
        // Update authenticated state (indicating user is logged in) and redirect to dashboard
      
        navigate('/tldraws');
      } else {
        // If login failed, display an error message
        setError('Login Failed. Please check your credentials.');
      }
    } catch (err) {
      // Handle any potential errors from the request
      // Extract a custom message from the server or set a default error message
      const serverMessage = err.response && err.response.data && err.response.data.msg;
      setError(serverMessage || 'An error occurred. Please try again.');
    }
  };

  // Render the component


  return (
    <div className="container1">
      <div className="image-container1">
        <img src={mentknowlogo} alt="Your Image Description" />
      </div>

      <div className='login-container'>
        <h2 className='SignInText1'>Sign In</h2>
        <p className='UserNameText1'>Username</p>
        <form onSubmit={onSubmit}>
          <input className='userNameForm1' type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
          <label className='password-label1'>Password</label>
          <input className='password-form1' type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
          {error && <div style={{ color: 'red', marginTop: '13px' }}>{error}</div>}
          <button className='login-button1' type="submit">Sign In</button>
          <a className='link-register1' href='/register'> Don’t have an account? Sign Up here
          </a>
        </form>
      </div>
    </div>
  );

};

export default Login;
