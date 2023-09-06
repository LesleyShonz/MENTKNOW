import React, { useState,  useContext  } from 'react';
import CreatePollForm from './polls/CreatePoll';
import VoteForm from './polls/VoteForm';
import UserContext from './UserContext';

function Dashboard(props) {

    const { user } = useContext(UserContext);
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showVoteForm, setShowVoteForm] = useState(false);

    const handleCreateClick = () => {
        setShowCreateForm(true);
        setShowVoteForm(false);
        console.log(user);
    };

    const handleVoteClick = () => {
        setShowCreateForm(false);
        setShowVoteForm(true);
    };

    
    return (
        <div>
        <div>
            <h1>Welcome to your Dashboard {user.name}</h1>
            
            {/* Buttons for Creating Poll and Voting */}
            <div>
                <button onClick={handleCreateClick}>Create New Poll</button>
                <button onClick={handleVoteClick}>Vote on Existing Poll</button>
            </div>

            {/* Conditionally render the Create Poll Form or Vote Form */}
            {showCreateForm && <CreatePollForm />}
            {showVoteForm && <VoteForm />}
        </div>

        </div>
    );
}

export default Dashboard;
