import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const fetchDataChallenge = createAsyncThunk(
  'fetch/challenges',
  async () => {
    const response = await api.get('/challenges');
    return response.data;
  },
);

const initialState = {
  challenges: [],
  status: 'idle',
  error: null,
};

export const fetchChallengeSlices = createSlice({
  name: 'fetchChallenges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataChallenge.pending, (state, data) => {
        state.status = 'fetching';
      })
      .addCase(fetchDataChallenge.fulfilled, (state, data) => {
        state.status = 'success';
        state.challenges = data.payload;
      })
      .addCase(fetchDataChallenge.rejected, (state, data) => {
        state.status = 'error';
        state.error = data.error.message;
      });
  },
});

export const fetchedChallengesData = (state) =>
  state.fetchChallenges.challenges;
export const fetchedChallengeStatus = (state) => state.fetchChallenges.status;
export const fetchedChallengeError = (state) => state.fetchChallenges.error;

export default fetchChallengeSlices.reducer;