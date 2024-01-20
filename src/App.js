import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { Routes, Route } from 'react-router-dom';
import ChallengesList from './Pages/ChallengesList/ChallengesList';
import AddChallenge from './Pages/AddChallenge/AddChallenge';
import Login from './Pages/Login/Login';
import Missing from './Pages/Missing/Missing';
import authentication from './utils/authentication';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const AuthenticatedChallengesList = authentication(
    ChallengesList,
    isLoggedIn,
  );

  const AuthenticatedAddChallenge = authentication(AddChallenge, isLoggedIn);

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
