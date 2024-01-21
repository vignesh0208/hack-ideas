import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '../../Component';
import {
  loginEmployeeId,
  handleLoginInfo,
  handleLoginDetail,
} from '../../slice/employeeSlice';

const Login = () => {
  const dispatch = useDispatch();
  const employeeid = useSelector(loginEmployeeId);

  const handleEmployeeLogin = (e) => {
    e.preventDefault();
    dispatch(handleLoginDetail(employeeid));
  };

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Sign in to your account
          </h1>
          <form
            className='space-y-4 md:space-y-6'
            onSubmit={handleEmployeeLogin}>
            <div>
              <label
                htmlFor='employeeid'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                Your Employee Id
              </label>
              <Input
                inputType='text'
                inputId='employeeid'
                extraClassName='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                inputPlaceholder='Enter your employee id'
                inputValue={employeeid}
                handleChange={(e) => dispatch(handleLoginInfo(e.target.value))}
                inputRequired={true}
              />
            </div>
            <Button
              buttonType='submit'
              extraClassName='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              children='Sign in'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
