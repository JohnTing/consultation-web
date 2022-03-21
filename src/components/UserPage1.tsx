
import React, { useState } from "react";
import { Button, Col, message, PageHeader, Row } from "antd";

import { useNavigate } from 'react-router-dom';

const myborder = {
  maxWidth: "640px",
  margin: "auto",
  borderStyle: "groove",
};

const myborder2 = {
  width: "auto",
  height: "auto",
  borderStyle: "groove",
};

const mybutton1 = {
  width: "64px",
  height: "64px",
};

type Prop = {
  nextpage: string;
};

export default function UserPage1(prop: Prop) {
  const navigate = useNavigate()
  

  const [mytext, setState] = useState<string>("");

  const Square = (props: { value: number }) => {
    return (
      <Button
        style={mybutton1}
        size="large"
        onClick={() => setState(mytext + props.value)}
      >
        {props.value}
      </Button>
    );
  };

  return (
    <>
      <div style={myborder}>
        <PageHeader title={"骨科APP 就診序號:" + mytext}></PageHeader>

        <div style={myborder2}>
          <Row align="top" justify="center">
            {[1, 2, 3].map((value, index, array) => {
              return (
                <Col key={index} style={{ width: "auto" }}>
                  <Square value={value} />
                </Col>
              );
            })}
          </Row>
          <Row align="top" justify="center">
            {[4, 5, 6].map((value, index, array) => {
              return (
                <Col key={index} style={{ width: "auto" }}>
                  <Square value={value} />
                </Col>
              );
            })}
          </Row>
          <Row align="top" justify="center">
            {[7, 8, 9].map((value, index, array) => {
              return (
                <Col key={index} style={{ width: "auto" }}>
                  <Square value={value} />
                </Col>
              );
            })}
          </Row>
          <Row align="top" justify="center">
            {[12, 0, 14].map((value, index, array) => {
              return (
                <Col key={index} style={{ width: "auto" }}>
                  <Square value={value} />
                </Col>
              );
            })}
          </Row>

          <Row align="top" justify="center">
            <Col key={0}>
            
              <Button type="primary" size="large" onClick={() => {

                if(mytext.length <= 0) {
                  message.error("請輸入就診序號")
                  return
                }

                navigate(`/${prop.nextpage}?id=${mytext}`)



              }} >
                確認
              </Button>
              
            </Col>
            <Col key={0}>
              <Button type="dashed" size="large" onClick={() => setState("")}>
                重新輸入
              </Button>
            </Col>

          </Row>
        </div>
      </div>
    </>
  );
}
