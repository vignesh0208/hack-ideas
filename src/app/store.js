import { configureStore } from '@reduxjs/toolkit';
import employeeSlice from '../slice/employeeSlice';
import { fetchChallengeData } from '../slice/ChallengesSlice/fetchChallengeSlice';

export const store = configureStore({
  reducer: {
    employee: employeeSlice,
    fetchChallenges: fetchChallengeData,
  },
});
