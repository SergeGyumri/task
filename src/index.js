import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {applyMiddleware, legacy_createStore} from "redux";
import reducers from "./store/reducers";
import sagas from './store/saga';
import './assets/styles/welcome.css'
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

const saga = createSagaMiddleware()

const store = legacy_createStore(
  reducers,
  applyMiddleware(saga, thunk)
)
saga.run(sagas)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
