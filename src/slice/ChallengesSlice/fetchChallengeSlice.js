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
  setSortBy: 'votes',
};

const fetchChallengeSlice = createSlice({
  name: 'fetchChallenge',
  initialState,
  reducers: {
    updateChallenge: (state, action) => {
      return { ...state, challenges: [...state.challenges, action.payload] };
    },
    upvoteChallenge: (state, action) => {
      const { id } = action.payload.response;
      const employeeId = action.payload.employeeId;
      const challenge = state.challenges.find((e) => e.id === id);
      if (challenge && !challenge.votedUsers.includes(employeeId)) {
        challenge.votes += 1;
        challenge.votedUsers.push(employeeId);
      }
    },
    setSortBy: (state, action) => {
      return { ...state, setSortBy: action.payload };
    },
  },
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
export const setSortChallenges = (state) => state.fetchChallenge.setSortBy;

export const { updateChallenge, upvoteChallenge, setSortBy } =
  fetchChallengeSlice.actions;
export default fetchChallengeSlice.reducer;
