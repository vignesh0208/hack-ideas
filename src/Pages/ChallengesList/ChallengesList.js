import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../Component';
import {
  fetchedChallengesData,
  fetchedChallengeStatus,
  fetchedChallengeError,
  upvoteChallenge,
  setSortChallenges,
  setSortBy,
} from '../../slice/ChallengesSlice/fetchChallengeSlice';
import { updateDataChallenge } from '../../slice/ChallengesSlice/updateChallengeSlice';
import { loginEmployeeId, fetchEmployeesData } from '../../slice/employeeSlice';
import { LikeIcon } from '../../icons';
import { formatTimeDifference } from '../../utils/formatTimeDifference';

const ChallengesList = () => {
  const dispatch = useDispatch();

  const employeeDetails = useSelector(fetchEmployeesData);
  const employeeId = useSelector(loginEmployeeId);
  const challengesData = useSelector(fetchedChallengesData);
  const challengesStatus = useSelector(fetchedChallengeStatus);
  const challengesError = useSelector(fetchedChallengeError);
  const sortBy = useSelector(setSortChallenges);

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

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const sortedChallenges = [...challengesData].sort((a, b) => {
    if (sortBy === 'votes') {
      return b.votes - a.votes;
    } else if (sortBy === 'creationDate') {
      return b.createdAt - a.createdAt;
    }
    return 0;
  });

  if (challengesStatus === 'fetching') {
    return (
      <div className='text-[24px] text-gray-800 dark:text-white/80 flex items-center justify-center w-full h-[calc(100vh-124px)]'>
        Loading...
      </div>
    );
  }
  if (challengesStatus === 'error') {
    return (
      <div className='text-[24px] text-gray-800 dark:text-white/80 flex items-center justify-center w-full h-[calc(100vh-124px)]'>
        {challengesError}
      </div>
    );
  }
  if (sortedChallenges?.length === 0) {
    return (
      <div className='text-[24px] text-gray-800 dark:text-white/80 flex items-center justify-center w-full h-[calc(100vh-124px)]'>
        No challenge found
      </div>
    );
  }
  return (
    <>
      <div className='flex items-center justify-between w-auto mb-2 sticky top-[50px]'>
        <div className='flex items-center'>
          <label className='w-[100px] mr-1 font-semibold text-gray-800 dark:text-white/80'>
            Sort By:
          </label>
          <select
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            value={sortBy}
            onChange={handleSortChange}>
            <option value='votes'>Votes</option>
            <option value='creationDate'>Creation Date</option>
          </select>
        </div>
      </div>
      <div className='flex flex-col items-center justify-between'>
        {sortedChallenges.map((challenge, index) => (
          <div
            key={index}
            className='max-w-xl p-8 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800 last:mb-0'>
            <div className='mb-4'>
              <p className='font-semibold text-gray-800 dark:text-white/80'>
                {employeeDetails && employeeDetails.length > 0
                  ? employeeDetails.find(
                      (emp) => emp.userId === challenge.userId,
                    )?.name
                  : 'Unknow user'}
              </p>
              <p className='text-sm text-gray-500 dark:text-white/50'>
                {formatTimeDifference(challenge.createdAt)}
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
                  <span>
                    {challenge.votes} Like{challenge.votes > 9 && 's'}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChallengesList;
