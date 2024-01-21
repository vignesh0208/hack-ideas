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
import { LikeIcon } from '../../icons';

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
        dispatch(
          upvoteChallenge({
            response: response.payload,
            employeeId: employeeId,
          }),
        );
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
    <div className='flex flex-col items-center justify-between'>
      {challengesData.map((challenge, index) => (
        <div
          key={index}
          className='max-w-xl p-8 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800 last:mb-0'>
          <div className='mb-4'>
            <p className='font-semibold text-gray-800 dark:text-white/80'>
              John Doe
            </p>
            <p className='text-sm text-gray-500 dark:text-white/50'>
              Posted 2 hours ago {challenge.createdAt}
            </p>
          </div>
          <div className='mb-4'>
            <h3 className='mb-2 text-gray-800 dark:text-white/80'>
              {challenge.title}
            </h3>
            <p className='mb-2 text-gray-500 dark:text-white/50'>
              {challenge.description}
            </p>
            <p className='mb-2 text-gray-500 capitalize dark:text-white/50'>
              Tags: {challenge.tag}
            </p>
          </div>
          <div className='flex items-center justify-between text-gray-500'>
            <div className='flex items-center space-x-2'>
              <Button
                buttonType='button'
                handleClick={() => handleUpvote(challenge)}
                extraClassName='flex items-center justify-center gap-2 p-1 px-2 rounded-full hover:bg-gray-50'>
                <span>
                  <LikeIcon
                    iconHeight='24'
                    iconWidth='24'
                  />
                </span>
                <span>{challenge.votes} Likes</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChallengesList;
