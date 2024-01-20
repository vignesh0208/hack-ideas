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
  employeeid: sessionStorage.getItem('employeeid') || '',
};

export const employeeSlices = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    handleLoginInfo: (state, action) => {
      return { ...state, employeeid: action.payload };
    },
    handleLoginDetail: (state, action) => {
      const employee =
        state.employees &&
        state.employees.find((emp) => emp.userId === action.payload);
      if (employee?.userId) {
        const newState = {
          ...state,
          loginEmployee: employee,
          employeeid: employee?.userId,
        };

        sessionStorage.setItem('employeeid', newState.employeeid);
        return newState;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchEmployeeData.fulfilled, (state, action) => {
      state.employees = action.payload;
    });
  },
});

export const fetchEmployeesData = (state) => state.employee.employees;
export const loginEmployeeDetails = (state) => state.employee.loginEmployee;
export const loginEmployeeId = (state) => state.employee.employeeid;

export const { handleLoginInfo, handleLoginDetail } = employeeSlices.actions;
export default employeeSlices.reducer;
