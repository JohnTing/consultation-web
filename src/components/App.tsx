import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import WorkQueueFrom from "./WorkQueueFrom";
import EditWorkFrom, { Worker } from "./EditWorkFrom";

import UserPage1 from "./UserPage1";
import UserPage2 from "./UserPage2";
import UserPage3 from "./UserPage3";
import { Col, Layout, Menu, Row } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";

export const App = () => {
  return (
    <Routes>
      <Route path="" element={<UserPage1 nextpage={"userpage2"}></UserPage1>} />
      <Route
        path="userpage1"
        element={<UserPage1 nextpage={"userpage2"}></UserPage1>}
      />
      <Route
        path="userpage2"
        element={
          <UserPage2
            nextpage={"userpage3"}
            returnpage={"userpage1"}
          ></UserPage2>
        }
      />
      <Route
        path="userpage3"
        element={<UserPage3 nextpage={"userpage1"}></UserPage3>}
      />

      <Route
        path="admin/*"
        element={
          <Layout>
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
              <div className="logo" />
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
                <Menu.Item key="1">
                工作項目 <Link to="WorkQueueFrom" />
                </Menu.Item>
                <Menu.Item key="2">
                工作設定 <Link to="setting" />
                </Menu.Item>
              </Menu>
            </Header>

            <Content
              className="site-layout"
              style={{ padding: "0 50px", marginTop: 64 }}
            >
              <Routes>
                <Route
                  path="WorkQueueFrom"
                  element={<WorkQueueFrom></WorkQueueFrom>}
                />
                <Route
                  path="Doctor"
                  element={<EditWorkFrom worker={Worker.Doctor}></EditWorkFrom>}
                />
                <Route
                  path="Nurse"
                  element={<EditWorkFrom worker={Worker.Nurse}></EditWorkFrom>}
                />
                <Route
                  path="setting"
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
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        }
      ></Route>
    </Routes>
  );
};
