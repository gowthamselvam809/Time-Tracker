import './App.css';
import React from 'react';
import RecoilSetup from './recoil/RecoilSetup';
import AppNavigator from './navigation/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <RecoilSetup>
          <React.Suspense fallback={<div>Loading...</div>}>
            <AppNavigator />
          </React.Suspense>
        </RecoilSetup>
      </PersistGate>
      <ToastContainer />
    </Provider>
  );
}

export default App;
