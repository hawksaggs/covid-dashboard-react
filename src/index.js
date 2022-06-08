import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import "bootstrap/dist/css/bootstrap.min.css";
import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  caseWorldWide: {},
  caseIndia: {},
  caseAllCountries: {},
  countriesNames: [],
};

function reducer(state = initialState, action) {
  // console.log("reducer: ", state, action);
  switch (action.type) {
    case "WORLDWIDE":
      return {
        ...state,
        caseWorldWide: action.payload,
      };
    case "INDIA":
      return {
        ...state,
        caseIndia: action.payload,
      };
    case "ALL_COUNTRIES":
      return {
        ...state,
        caseAllCountries: action.payload,
      };
    case "COUNTRIES_NAMES":
      return {
        ...state,
        countriesNames: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);
// console.log("store: ", store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
