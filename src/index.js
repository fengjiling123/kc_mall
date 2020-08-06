import "core-js";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router-dom";
import App from "pages/App";
import history from "util/history";
import * as serviceWorker from "./serviceWorker";
// import VConsole from "vconsole";

// rem 适配
import "util/font.js";
// 网站通用常量
import "src/config/constant.js";
import "src/util/statistics.js";

// new VConsole();

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
