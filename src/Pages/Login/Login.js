import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button } from '../../Component';
import { handleLogin } from '../../slice/employeeSlice';

const Login = () => {
  const dispatch = useDispatch();

  const [employeeid, setEmployeeid] = useState('');

  const handleEmployeeLogin = (e) => {
    e.preventDefault();
    dispatch(handleLogin(employeeid));
    setEmployeeid('');
  };

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
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
                  inputName='employeeid'
                  extraClassName='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  inputPlaceholder='Enter your employee id'
                  inputValue={employeeid}
                  handleChange={(e) => setEmployeeid(e.target.value)}
                  inputRequired={true}
                />
              </div>
              <Button
                buttonType='submit'
                extraClassName='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
                children='Sign in'
              />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
