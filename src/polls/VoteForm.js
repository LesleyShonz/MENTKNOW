import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './VoteForm.css'

const VotePoll = () => {
    const [poll, setPoll] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [hasVoted, setHasVoted] = useState(false);
    
    useEffect(() => {
        async function fetchPoll() {
            try {
                const response = await axios.get('http://localhost:5009/api/polls/getPoll');
                setPoll(response.data);
            } catch (error) {
                console.error("Error fetching poll:", error);
            }
        }

        fetchPoll();
    }, []);
    
    const handleVote = async () => {
        try {
            // Assuming you have an API endpoint to handle votes that expects an 'option' in the request body
            await axios.post(`http://localhost:5009/api/polls/vote/${poll._id}`, { option: selectedOption });
            // Fetch updated poll data after voting
            const response = await axios.get(`http://localhost:5009/api/polls/results/${poll._id}`);
            setPoll(response.data);
            setHasVoted(true);
        } catch (error) {
            console.error("Error voting:", error);
        }
    };
    

    if (!poll) return <p>Loading poll...</p>;

    return (
        <div className='VoteForm'>
            <h2>{poll.question}</h2>
            {hasVoted ? (
                <div>
                    <h3>Results:</h3>
                    {poll.options.map((option, index) => (
                        <div key={index}>
                            {option.name}: {option.votes} votes
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    {poll.options.map((option, index) => (
                        <div key={index}>
                            <input 
                                type="radio" 
                                value={option.name} 
                                checked={selectedOption === option.name}
                                onChange={e => setSelectedOption(e.target.value)} 
                            />
                            {option.name}
                        </div>
                    ))}
                    <button onClick={handleVote}>Vote</button>
                </>
            )}
        </div>
    );
    
};

export default VotePoll;
