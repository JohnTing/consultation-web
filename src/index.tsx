import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './App.css';
import reportWebVitals from './reportWebVitals';
import OutpatientWorkFrom, {Worker} from './components/OutpatientWorkFrom';
import { Col, Row } from 'antd';


ReactDOM.render(
  <React.StrictMode>

    <Row gutter={16}>
      <Col><OutpatientWorkFrom worker={Worker.Doctor} ></OutpatientWorkFrom></Col>
      <Col><OutpatientWorkFrom worker={Worker.Nurse} ></OutpatientWorkFrom></Col>
    </Row>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
