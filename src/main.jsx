import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';

import { store } from '@/redux/store.js';
import { Provider } from 'react-redux';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import '@/assets/css/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
        <ToastContainer icon={true} />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
