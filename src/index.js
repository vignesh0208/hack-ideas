import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import ErrorBoundary from './utils/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { fetchEmployeeData } from './slice/employeeSlice';

store.dispatch(fetchEmployeeData());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ErrorBoundary>,
);
