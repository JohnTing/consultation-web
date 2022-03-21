import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {Col, Layout, Menu, Row } from "antd";

import "./index.css";
// import 'antd/dist/antd.variable.min.css';
import 'antd/dist/antd.min.css';


import WorkQueueFrom from "./components/WorkQueueFrom";
import EditWorkFrom, { Worker } from "./components/EditWorkFrom";
import UserPage1 from "./components/UserPage1";

import { HashRouter, Link, Route, Routes } from "react-router-dom";

import UserPage2 from "./components/UserPage2";
import MainLayout from "./components/MainLayout";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import UserPage3 from "./components/UserPage3";


ReactDOM.render(
  <HashRouter>
    <React.StrictMode>


    <Routes>
    <Route path="/" element={<UserPage1 nextpage={"userpage2"}></UserPage1>}/>
    <Route path="/userpage1" element={<UserPage1 nextpage={"userpage2"}></UserPage1>}/>
    <Route path="/userpage2" element={<UserPage2 nextpage={"userpage3"} returnpage={"userpage1"}></UserPage2>}/>
    <Route path="/userpage3" element={<UserPage3 nextpage={"userpage1"}></UserPage3>}/>

    <Route path='/admin/*' element={

          <Layout>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>

                <Menu.Item key="1">nav 1 <Link to="userpage1" /></Menu.Item>
                <Menu.Item key="2">nav 1 <Link to="userpage2" /></Menu.Item>
                <Menu.Item key="3">nav 1 <Link to="WorkQueueFrom" /></Menu.Item>
                <Menu.Item key="4">nav 1 <Link to="setting" /></Menu.Item>
              </Menu>
            </Header>
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>

              <Routes>

                <Route path='/EditWorkFrom'/>

                <Route path="/mainlayout" element={<MainLayout></MainLayout>}/>
                <Route path="/userpage1" element={<UserPage1 nextpage={"userpage2"}></UserPage1>}/>
                <Route path="/userpage2" element={<UserPage2 nextpage={"userpage3"} returnpage={"userpage1"}></UserPage2>}/>
                <Route path="/userpage3" element={<UserPage3 nextpage={"userpage1"}></UserPage3>}/>

                
                <Route path="/WorkQueueFrom" element={<WorkQueueFrom></WorkQueueFrom>}/>
                <Route path="/Doctor" element={<EditWorkFrom worker={Worker.Doctor}></EditWorkFrom>}/>
                <Route path="/Nurse" element={<EditWorkFrom worker={Worker.Nurse}></EditWorkFrom>}/>


                <Route
                  path="/setting"
                  element={
                    <React.StrictMode>
                      
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
                />
              </Routes>

            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>

                }/>
          </Routes>

    </React.StrictMode>
  </HashRouter>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

