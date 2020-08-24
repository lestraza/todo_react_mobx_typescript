import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './style.css'
import { Provider } from 'mobx-react'
import MainStore from './store/mainStore'

const store = new MainStore()

ReactDOM.render( 
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
);
