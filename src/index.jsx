import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app';
import store from './store/index.js';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
