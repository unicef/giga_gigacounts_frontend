import React from 'react'
import { Provider } from 'react-redux'
import storeReducer from './redux/reducers/storeReducer';
import { createStore , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import App from './components/App'
import ReactDOM from "react-dom";

const store = createStore(storeReducer, applyMiddleware(thunk));

ReactDOM.render(
  <div>
    <Provider store={store}><App /></Provider>
  </div>,
  document.getElementById('root')
);
