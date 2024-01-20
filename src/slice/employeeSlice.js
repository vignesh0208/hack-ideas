import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';

export const fetchEmployeeData = createAsyncThunk(
  'fetch/employee',
  async () => {
    const response = await api.get('/employees');
    console.log(response);
    return response.data;
  },
);

const initialState = {
  employees: [],
};

export const employeeSlices = createSlice({
  name: 'employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeData.fulfilled, (state, data) => {
      state.employees = data.payload;
    });
  },
});

export const seletedAllUsers = (state) => state.employee.employees;

export default employeeSlices.reducer;