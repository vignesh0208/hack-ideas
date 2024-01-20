import React from 'react';
import { useSelector } from 'react-redux';
import {
  fetchedChallengesData,
  fetchedChallengeStatus,
  fetchedChallengeError,
} from '../../slice/ChallengesSlice/fetchChallengeSlice';

const ChallengesList = () => {
  const challengesData = useSelector(fetchedChallengesData);
  const challengesStatus = useSelector(fetchedChallengeStatus);
  const challengesError = useSelector(fetchedChallengeError);

  if (challengesStatus === 'fetching') {
    return <div>Loading...</div>;
  }
  if (challengesStatus === 'error') {
    return <div>{challengesError}</div>;
  }
  return (
    <div>
      <h2>Challenges</h2>
      <ul>
        {challengesData.map((challenge, index) => (
          <li key={index}>
            <h3>{challenge.title}</h3>
            <p>{challenge.description}</p>
            <p>Tags: {challenge.tags.join(', ')}</p>
            <p>Votes: {challenge.votes}</p>
            <p>Created at: {challenge.createdAt}</p>
            <button>Upvote</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengesList;
