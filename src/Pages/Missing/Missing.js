import React from 'react';
import { Link } from 'react-router-dom';

const Missing = ({ isLoggedIn }) => {
  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <h2>Page Not Found</h2>
        {isLoggedIn ? (
          <Link to='/'>Go to Login</Link>
        ) : (
          <Link to='/challenge-list'>Visit Our Homepage</Link>
        )}
      </div>
    </section>
  );
};

export default Missing;
