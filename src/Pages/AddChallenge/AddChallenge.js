import React, { useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Input, Textarea, Select, Button } from '../../Component';
import { loginEmployeeId } from '../../slice/employeeSlice';
import { postChallengeInfo } from '../../slice/ChallengesSlice/postChallengeSlice';
import {
  updateChallenge,
  fetchedChallengesData,
} from '../../slice/ChallengesSlice/fetchChallengeSlice';

const predefinedTags = ['feature', 'tech', 'design', 'bug', 'enhancement'];
const challengeObj = {
  title: '',
  description: '',
  tag: predefinedTags[0],
};

const handleChallenge = (state, action) => {
  if (action.state === 'update') {
    return { ...state, [action.type]: action.payload };
  } else if (action.state === 'reset') {
    return challengeObj;
  }
};

const AddChallenge = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUserId = useSelector(loginEmployeeId);
  const challengeList = useSelector(fetchedChallengesData);

  const [newChallenge, dispatchChallenge] = useReducer(
    handleChallenge,
    challengeObj,
  );

  const handleAddChallenge = async (e) => {
    e.preventDefault();
    const postChallenge = {
      id:
        challengeList?.length > 0
          ? challengeList[challengeList.length - 1].id
          : 1,
      title: newChallenge.title,
      description: newChallenge.description,
      tag: newChallenge.tag,
      votes: 0,
      createdAt: new Date().getTime(),
      userId: currentUserId ? currentUserId : '',
      votedUsers: [],
    };

    try {
      const responce = await dispatch(postChallengeInfo(postChallenge));
      dispatch(updateChallenge(responce.payload));
      navigate('/challenge');
    } catch (err) {
      console.error('Error while posting challenge', err);
    }
  };

  return (
    <div className='max-w-screen-md px-4 py-8 mx-auto lg:py-16'>
      <h2 className='mb-4 text-4xl font-extrabold tracking-tight text-center text-gray-900 dark:text-white'>
        Add New Challenge
      </h2>

      <form
        onSubmit={handleAddChallenge}
        className='space-y-8'>
        <div>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Title
          </label>
          <Input
            inputType='text'
            inputId='title'
            inputName='title'
            extraClassName='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
            inputPlaceholder='Enter Title'
            inputValue={newChallenge.title}
            handleChange={(e) =>
              dispatchChallenge({
                state: 'update',
                type: 'title',
                payload: e.target.value,
              })
            }
            inputRequired={true}
          />
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='message'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>
            Description
          </label>
          <Textarea
            textareaId='message'
            textareaRow={6}
            extraClassName='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            textareaPlaceholder='Enter your description...'
            children={newChallenge.description}
            handleChange={(e) =>
              dispatchChallenge({
                state: 'update',
                type: 'description',
                payload: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label
            htmlFor='tags'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
            Tags
          </label>
          <Select
            selectName='tag'
            selectOptions={predefinedTags}
            selectedValue={newChallenge.tag}
            handleSelect={(e) =>
              dispatchChallenge({
                state: 'update',
                type: 'tag',
                payload: e.target.value,
              })
            }
            extraClassName='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize'
          />
        </div>

        <Button
          buttonType='submit'
          extraClassName='py-3 px-5 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
          children='Post Challenge'
        />
      </form>
    </div>
  );
};

export default AddChallenge;
