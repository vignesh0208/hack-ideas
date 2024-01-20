import React from 'react';
import { Link } from 'react-router-dom';

const Missing = ({ isLoggedIn }) => {
  return (
    <section className='Missing'>
      <h2>Page Not Found</h2>
      {isLoggedIn ? (
        <Link to='/'>Go to Login</Link>
      ) : (
        <Link to='/challenge-list'>Visit Our Homepage</Link>
      )}
    </section>
  );
};

export default Missing;
