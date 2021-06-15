import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import root from "./redux/root";
import "jquery/dist/jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { getUser, setUser } from "./utils/userStorage";
import { onLogin } from "./redux/user/action";
const store = createStore(root, applyMiddleware(thunk));
const data = getUser();
if (data && data.remember === true) {
  setUser({ ...data, remember: null });
}
if (data?.remember === null) {
  // store.dispatch(onLogin({ user: {}, token: null }));
  store.dispatch(onLogin(data));
} else {
  store.dispatch(onLogin(data));
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
