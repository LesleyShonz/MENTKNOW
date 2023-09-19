import "./MainPoll.css";
import reject3 from "../icons/reject3.svg";
import React, { useState } from "react";
import CreatePollForm from "./CreatePoll";
import VoteForm from "./VoteForm";

function MainPoll() {
  const [isContainerVisible, setIsContainerVisible] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showVoteForm, setShowVoteForm] = useState(false);

  const handleCreateClick = () => {
    setShowCreateForm(true);
    setShowVoteForm(false);
    setIsContainerVisible(false);
  };

  const handleVoteClick = () => {
    setShowCreateForm(false);
    setShowVoteForm(true);
    setIsContainerVisible(false);
  };

  return (
    <div>
      {isContainerVisible && (
        <div className="createButton-container">
          <h1 className="header-create-poll">I want to...</h1>
          <button
            className="create-new-poll-button"
            type="button"
            onClick={handleCreateClick}
          >
            Create new Poll
          </button>
          <button
            className="vote-on-existing-poll"
            type="button"
            onClick={handleVoteClick}
          >
            Vote on an existing poll
          </button>
        </div>
      )}

      {showCreateForm && <CreatePollForm />}
      {showVoteForm && <VoteForm />}
    </div>
  );
}

export default MainPoll;
