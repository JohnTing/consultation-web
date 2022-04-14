import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Col, Layout, Menu, Row } from "antd";


// import "antd/dist/antd.min.css";

import "./index.css";
// import 'antd/dist/antd.variable.min.css';

import { BrowserRouter, Navigate, Route } from "react-router-dom";

import { App } from "./components/App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="/consultation-web">
      <App />

    </BrowserRouter>,

  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
