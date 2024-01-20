import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../utils/api';

export const fetchEmployeeData = createAsyncThunk(
  'fetch/employee',
  async () => {
    const response = await api.get('/employee');
    return response.data;
  },
);

const initialState = {
  employees: [],
  loginEmployee: {},
};

export const employeeSlices = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    handleLogin: (state, action) => {
      const employee =
        state.employees &&
        state.employees.find((emp) => emp.userId === action.payload);
      if (employee?.userId) {
        return { ...state, loginEmployee: employee };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeData.fulfilled, (state, data) => {
      state.employees = data.payload;
    });
  },
});

export const fetchEmployeesData = (state) => state.employee.employees;
export const loginEmployeeDetails = (state) => state.employee.loginEmployee;

export const { handleLogin } = employeeSlices.actions;
export default employeeSlices.reducer;
