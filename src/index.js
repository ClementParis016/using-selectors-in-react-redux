import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import Invoice from './Invoice';
import Cart from './Cart';

import './styles.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Cart />
        <Invoice />
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
