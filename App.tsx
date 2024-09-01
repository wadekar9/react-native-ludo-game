import React from 'react'
import { Provider } from 'react-redux';
import { persistor, store } from '$redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from '$navigation/RootNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App