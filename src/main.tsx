import React from 'react'
import ReactDOM  from 'react-dom/client'
import './index.css'
import App from './App'
import { Provider } from 'react-redux';
import { store, persistedStore } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
// import { LoadingProvider } from './context/LoadingContext';


const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Failed to find the root element");



const root = ReactDOM.createRoot(rootElement);
root.render(
  <Provider store={store}>
    {/* <LoadingProvider> */}
      <PersistGate loading={null} persistor={ persistedStore } >
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </PersistGate>
    {/* </LoadingProvider> */}
  </Provider>
);
