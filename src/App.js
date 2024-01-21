import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'tailwindcss/tailwind.css';
import Login from './Pages/Login/Login';
import Missing from './Pages/Missing/Missing';
import authentication from './utils/authentication';
import {
  loginEmployeeId,
  loginEmployeeDetails,
  handleLoginDetail,
} from './slice/employeeSlice';
import { fetchDataChallenge } from './slice/ChallengesSlice/fetchChallengeSlice';
import Nav from './Pages/Nav/Nav';

function App() {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const employeeId = useSelector(loginEmployeeId);
  const employeeDetails = useSelector(loginEmployeeDetails);

  const [isLoggedIn, setLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true',
  );

  const AuthenticatedNav = authentication(Nav, isLoggedIn);
  const MemoizedAuthenticatedNav = React.memo(AuthenticatedNav);

  useEffect(() => {
    dispatch(fetchDataChallenge());
  }, [dispatch]);

  useEffect(() => {
    if (employeeDetails?.userId) {
      dispatch(handleLoginDetail(employeeDetails));
      setLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true');

      const timeoutId = setTimeout(() => {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('employeeid');
        setLoggedIn(false);
      }, 10 * 60 * 1000);

      navigator('/challenge');

      return () => clearTimeout(timeoutId);
    } else {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('employeeid');
      setLoggedIn(false);
    }
  }, [dispatch, employeeId, employeeDetails, navigator]);

  return (
    <section className='h-screen bg-gray-50 dark:bg-gray-900'>
      <Routes>
        <Route
          path='/'
          element={<Login />}
        />
        <Route
          path='/challenge/*'
          element={<MemoizedAuthenticatedNav />}
        />
        <Route
          path='*'
          element={<Missing isLoggedIn={isLoggedIn} />}
        />
      </Routes>
    </section>
  );
}

export default App;
