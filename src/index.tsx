import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Col, Row } from "antd";

// import 'antd/dist/antd.variable.min.css';
import 'antd/dist/antd.min.css';

import WorkQueueFrom from "./components/WorkQueueFrom";
import EditWorkFrom, { Worker } from "./components/EditWorkFrom";
import UserPage1 from "./components/UserPage1";

import { BrowserRouter, Route, Routes } from "react-router-dom";




import { ConfigProvider } from 'antd';
import UserPage2 from "./components/UserPage2";

ConfigProvider.config({
  theme: {
    
  },
});



ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<React.StrictMode> <UserPage1></UserPage1>  </React.StrictMode>}></Route>
      <Route path="/userpage2" element={<React.StrictMode> <UserPage2></UserPage2>  </React.StrictMode>}></Route>
      <Route
        path="/setting"
        element={
          <React.StrictMode>
            <WorkQueueFrom></WorkQueueFrom>
            <Row gutter={16}>
              <Col>
                <EditWorkFrom worker={Worker.Doctor}></EditWorkFrom>
              </Col>
              <Col>
                <EditWorkFrom worker={Worker.Nurse}></EditWorkFrom>
              </Col>
            </Row>
          </React.StrictMode>
        }
      ></Route>
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
