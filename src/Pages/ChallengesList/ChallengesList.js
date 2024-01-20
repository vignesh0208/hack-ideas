import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDataChallenge,
  fetchedChallengesData,
  fetchedChallengeStatus,
  fetchedChallengeError,
} from '../../slice/ChallengesSlice/fetchChallengeSlice';

const ChallengesList = () => {
  const dispatch = useDispatch();
  const challengesData = useSelector(fetchedChallengesData);
  const challengesStatus = useSelector(fetchedChallengeStatus);
  const challengesError = useSelector(fetchedChallengeError);

  useEffect(() => {
    if (challengesStatus === 'idle') {
      dispatch(fetchDataChallenge());
    }
  }, [challengesStatus, dispatch]);

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
