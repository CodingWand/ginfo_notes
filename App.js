import MyStack from './Navigation/Navigation';
import { Provider } from 'react-redux';
import store from './store.js';

export default function App() {
  return (
    <Provider store={store}>
      <MyStack />
    </Provider>
  );
}
