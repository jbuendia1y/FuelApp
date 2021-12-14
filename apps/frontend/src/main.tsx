import "./index.scss";
import React from "react";

import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Contexts from "./Contexts";

ReactDOM.render(
  <React.StrictMode>
    <Contexts>
      <Router>
        <App />
      </Router>
    </Contexts>
  </React.StrictMode>,
  document.getElementById("root")
);
