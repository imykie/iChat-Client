import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.css";
import "materialize-css/dist/css/materialize.min.css";
// import M from 'materialize-css';
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./components/Firebase";

ReactDOM.render(
  <React.StrictMode>
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// https://bit.ly/CRA-PWA
serviceWorker.unregister();
