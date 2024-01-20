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

const fetchChallengeSlice = createSlice({
  name: 'fetchChallenge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataChallenge.pending, (state, action) => {
        state.status = 'fetching';
      })
      .addCase(fetchDataChallenge.fulfilled, (state, action) => {
        state.status = 'success';
        state.challenges = action.payload;
      })
      .addCase(fetchDataChallenge.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const fetchedChallengesData = (state) => state.fetchChallenge.challenges;
export const fetchedChallengeStatus = (state) => state.fetchChallenge.status;
export const fetchedChallengeError = (state) => state.fetchChallenge.error;

export default fetchChallengeSlice.reducer;
