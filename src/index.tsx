import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';
import { Col, Row } from 'antd';

import EditWorkFrom, {Worker} from './components/EditWorkFrom';



ReactDOM.render(
  <React.StrictMode>

    <Row gutter={16}>
      <Col><EditWorkFrom worker={Worker.Doctor} ></EditWorkFrom></Col>
      <Col><EditWorkFrom worker={Worker.Nurse} ></EditWorkFrom></Col>
    </Row>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
