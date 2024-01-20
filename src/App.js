import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import ChallengesList from './Pages/ChallengesList/ChallengesList';
import AddChallenge from './Pages/AddChallenge/AddChallenge';
import Login from './Pages/Login/Login';
import Missing from './Pages/Missing/Missing';
import authentication from './utils/authentication';
import { loginEmployeeDetails } from './slice/employeeSlice';

function App() {
  const navigator = useNavigate();
  const employeeDetail = useSelector(loginEmployeeDetails);

  const [isLoggedIn, setLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true',
  );

  const AuthenticatedChallengesList = authentication(
    ChallengesList,
    isLoggedIn,
  );
  const AuthenticatedAddChallenge = authentication(AddChallenge, isLoggedIn);

  useEffect(() => {
    if (employeeDetail?.userId) {
      setLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true');

      const timeoutId = setTimeout(() => {
        sessionStorage.removeItem('isLoggedIn');
        setLoggedIn(false);
      }, 10 * 60 * 1000);

      navigator('/challenge-list');

      return () => clearTimeout(timeoutId);
    }
  }, [employeeDetail]);

  return (
    <Routes>
      <Route
        path='/'
        element={<Login />}
      />
      <Route
        path='/challenge-list'
        element={<AuthenticatedChallengesList />}
      />
      <Route
        path='/add-challenge'
        element={<AuthenticatedAddChallenge />}
      />
      <Route
        path='*'
        element={<Missing isLoggedIn={isLoggedIn} />}
      />
    </Routes>
  );
}

export default App;
