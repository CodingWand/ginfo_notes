import MyStack from './Navigation/Navigation';
import { Provider } from 'react-redux';
import {store, persistor} from './store.js';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MyStack />
      </PersistGate>
    </Provider>
  );
}
