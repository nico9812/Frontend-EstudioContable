import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/redux/store.js';

import 'react-toastify/dist/ReactToastify.min.css';

import App from '@/App';
import { VITE_ENV_MODE } from '@/constants';

const root = ReactDOM.createRoot(document.getElementById('root'));

if (VITE_ENV_MODE === 'produccion' || VITE_ENV_MODE === 'testing') {
  root.render(
    <StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
    </StrictMode>
  );
} else if (VITE_ENV_MODE === 'desarrollo' || VITE_ENV_MODE === undefined) {
  root.render(
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <App />
      </Provider>
    </PersistGate>
  );
}
