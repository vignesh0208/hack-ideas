import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const updateDataChallenge = createAsyncThunk(
  'patch/challenges',
  async (changedData) => {
    const response = await api.put(
      `/challenges/${changedData.id}`,
      changedData,
    );
    return response.data;
  },
);

const initialState = {
  data: {},
  status: 'idle',
  error: null,
};

const updateChallengeSlice = createSlice({
  name: 'updateChallenge',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateDataChallenge.pending, (state, action) => {
        state.status = 'fetching';
      })
      .addCase(updateDataChallenge.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(updateDataChallenge.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      });
  },
});

export const updateChallengesData = (state) => state.updateChallenge.data;
export const updateChallengeStatus = (state) => state.updateChallenge.status;
export const updateChallengeError = (state) => state.updateChallenge.error;

export const { upvoteChallenge } = updateChallengeSlice.actions;
export default updateChallengeSlice.reducer;
