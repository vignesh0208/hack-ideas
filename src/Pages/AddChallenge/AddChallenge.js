import React, { useReducer, useState } from 'react';
import { Input, Textarea, Button } from '../../Component';

const handleChallenge = (state, action) => {
  return { ...state, [action.type]: action.payload };
};

const AddChallenge = ({ onAdd }) => {
  const challengeObj = {
    title: '',
    description: '',
    tags: '',
  };
  const [newChallenge, dispatchChallenge] = useReducer(
    handleChallenge,
    challengeObj,
  );

  const handleAddChallenge = (e) => {
    e.preventDefault();
    const postChallenge = {
      id: '',
      title: newChallenge.title,
      description: newChallenge.description,
      tags: newChallenge.split(',').map((tag) => tag.trim()),
      votes: 0,
      createdAt: new Date().toLocaleDateString(),
      userId: 'HIIND03',
    };

    onAdd(postChallenge);
  };

  return (
    <section className='bg-white dark:bg-gray-900'>
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
              Tags (comma-separated)
            </label>
            <Input
              inputType='text'
              inputId='tags'
              inputName='tags'
              extraClassName='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              inputPlaceholder='Enter Tags (comma-separated)'
              inputValue={newChallenge.tags}
              handleChange={(e) =>
                dispatchChallenge({
                  type: 'tags',
                  payload: e.target.value,
                })
              }
            />
          </div>

          <Button
            buttonType='submit'
            extraClassName='py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
            children='Post Challenge'
          />
        </form>
      </div>
    </section>
  );
};

export default AddChallenge;
