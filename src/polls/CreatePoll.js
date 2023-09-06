import React, { useState } from 'react';
import axios from 'axios';

const CreatePoll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [message, setMessage] = useState('');  // To provide feedback to the user

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => setOptions([...options, '']);

  const handleSubmit = async e => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    // Check for token
    // if (!token) {
    //   setMessage('Token not found. Please log in again.');
    //   return;
    // }

    const config = {
      headers: {
        'x-auth-token': token
      }
    };

    try {
      const response = await axios.post('http://localhost:3007/api/polls', { question, options }, config);
      console.log(response.data);
      if (response.data.question === question) {
        setMessage('Poll created successfully!');
        console.log(response.data);
      } else {
        setMessage(response.data.msg || 'Unknown error occurred while creating poll.');
        console.error('Error creating poll:', response.data.msg || 'Unknown error');
      }
    } catch (error) {
      setMessage('Error occurred. Please try again later.');
      console.error('Error creating poll:', error.message);
    }
  };

  return (
    <div style={{ width: '320px', height: '729px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
        />
        {options.map((option, index) => (
          <input
            key={`option-${index}`}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={e => handleOptionChange(index, e.target.value)}
          />
        ))}
        <button type="button" onClick={addOption}>Add Option</button>
        <button type="submit">Create Poll</button>
      </form>
      {message && <p>{message}</p>}  {/* Displaying feedback message */}
    </div>
  );
};

export default CreatePoll;
