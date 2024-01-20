import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const postChallengeInfo = createAsyncThunk(
  'post/challenges',
  async (data) => {
    const response = await api.post('/challenges', data);
    return response.data;
  },
);

const initialState = {
  data: {},
  status: 'idle',
  error: null,
};

const postChallengeSlice = createSlice({
  name: 'postChallenge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postChallengeInfo.pending, (state, action) => {
        state.status = 'fetching';
      })
      .addCase(postChallengeInfo.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(postChallengeInfo.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const postChallengeData = (state) => state.postChallenge.data;
export const postChallengeStatus = (state) => state.postChallenge.status;
export const postChallengeError = (state) => state.postChallenge.error;

export default postChallengeSlice.reducer;
