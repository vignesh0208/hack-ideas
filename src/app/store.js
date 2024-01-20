import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from '../slice/employeeSlice';
import fetchChallengeSlice from '../slice/ChallengesSlice/fetchChallengeSlice';
import postChallengeSlice from '../slice/ChallengesSlice/postChallengeSlice';
import updateChallengeSlice from '../slice/ChallengesSlice/updateChallengeSlice';

export const store = configureStore({
  reducer: {
    employee: employeeSlice,
    fetchChallenge: fetchChallengeSlice,
    postChallenge: postChallengeSlice,
    updateChallenge: updateChallengeSlice,
  },
});
