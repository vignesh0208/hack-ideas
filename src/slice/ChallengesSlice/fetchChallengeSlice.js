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
  reducers: {
    updateChallenge: (state, action) => {
      return { ...state, challenges: [...state.challenges, action.payload] };
    },
    upvoteChallenge: (state, action) => {
      const { id, userId } = action.payload;
      const challenge = state.challenges.find((e) => e.id === id);
      if (challenge && !challenge.votedUsers.includes(userId)) {
        challenge.votes += 1;
        challenge.votedUsers.push(userId);
      }
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

export const { updateChallenge, upvoteChallenge } = fetchChallengeSlice.actions;
export default fetchChallengeSlice.reducer;
