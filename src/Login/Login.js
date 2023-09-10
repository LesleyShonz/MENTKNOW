import React, { useState, useContext } from 'react';
import UserContext from '../Whiteboard/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import mentknowlogo from '../icons/mentknowlogo.svg';

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigateUser = (userType) => {
    navigate(userType === 'mentee' ? '/dashboard' : '/MentorDashboard');
  };

  const handleMoveToRegister = () => {

    navigate('/register');
  }

  const onSubmit = async e => {
    e.preventDefault();
  
    setError('');
    setLoading(true);
  
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    try {
      const body = JSON.stringify({ email, password });
      const res = await axios.post('http://localhost:5004/api/users/login', body, config);
  
      setLoading(false); // End loading
  
      if (res.data) {
        localStorage.setItem('userData', JSON.stringify(res.data));
        setUser(res.data);
        navigateUser(res.data.userType);
      } else {
        setError('Login Failed. Please check your credentials.');
      }
    } catch (err) {
      setLoading(false);
  
      // Checking for client errors
      if (err.response && err.response.status >= 400 && err.response.status < 500) {
        if (err.response.data && err.response.data.errors && err.response.data.errors.length > 0) {
          setError(err.response.data.errors[0].msg);
        } else {
          setError('Login Failed. Please check your credentials.');
        }
      } 
      // Checking for server errors or other types of errors
      else {
        setError('Server error. Please try again later.');
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
        <p className='UserNameText1'>Username</p>
        <form onSubmit={onSubmit}>
          <input
            className='userNameForm1'
            type="email"
            placeholder="Email Address"
            name="email"
            value={email.toLowerCase()}
            onChange={onChange}
            required
          />
          <label className='password-label1'>Password</label>
          <input
            className='password-form1'
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
          {loading && <div style={{marginTop: '13px' , marginLeft:'315px'}}>Loading...</div>}
          {error && <div style={{ color: 'red', marginTop: '13px' , marginLeft:'315px'}}>{error}</div>}
          <button className='login-button1' type="submit">Sign In</button>
          <a className='link-register1' onClick={handleMoveToRegister}> Don’t have an account? Sign Up here </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
