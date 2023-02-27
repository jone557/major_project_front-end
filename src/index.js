import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Redux/store'
import { AppProvider, AppContext } from './context/context';
// import { AuthProvider } from './Context/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AppProvider >
      <App  />
    </AppProvider>
  </Provider>
);

reportWebVitals();
