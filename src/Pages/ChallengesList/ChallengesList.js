import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../Component';
import {
  fetchedChallengesData,
  fetchedChallengeStatus,
  fetchedChallengeError,
  upvoteChallenge,
} from '../../slice/ChallengesSlice/fetchChallengeSlice';
import { updateDataChallenge } from '../../slice/ChallengesSlice/updateChallengeSlice';
import { loginEmployeeId } from '../../slice/employeeSlice';

const ChallengesList = () => {
  const dispatch = useDispatch();

  const employeeId = useSelector(loginEmployeeId);
  const challengesData = useSelector(fetchedChallengesData);
  const challengesStatus = useSelector(fetchedChallengeStatus);
  const challengesError = useSelector(fetchedChallengeError);

  const handleUpvote = async (selectedChallenge) => {
    if (
      selectedChallenge &&
      !selectedChallenge.votedUsers.includes(employeeId)
    ) {
      const updatedChallenge = {
        ...selectedChallenge,
        votes: selectedChallenge.votes + 1,
        votedUsers: [...selectedChallenge.votedUsers, employeeId],
      };
      try {
        const response = await dispatch(updateDataChallenge(updatedChallenge));
        dispatch(upvoteChallenge(response.payload));
      } catch (err) {
        console.error('Error while updating data', err);
      }
    }
  };

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
            <Button
              buttonType='button'
              children='Upvote'
              handleClick={() => handleUpvote(challenge)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengesList;
