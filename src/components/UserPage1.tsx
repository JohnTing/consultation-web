import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { type } from "@testing-library/user-event/dist/type";
import { Button, Col, PageHeader, Row } from "antd";

const myborder = {
  maxWidth: "640px",
  margin: "auto",
  borderStyle: "groove"
}

const myborder2 = {
  width: "auto",
  height: "auto",
  borderStyle: "groove"
}

const mybutton1 = {

  width: "100px", 
  height: "100px"
}


type Prop = {
  nextpage: string;
};

export default function UserPage1(prop: Prop) {
  const [mytext, setState] = useState<string>("");
  const Square = (props: { value: number }) => {
    return (
      <Button style={mybutton1}
      size="large" onClick={() => setState(mytext + props.value)}>
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
            <Col  key={index} style={{width: "auto"}}><Square value={value}/></Col>
          );
        })}
      </Row>
      <Row align="top" justify="center">
        {[4, 5, 6].map((value, index, array) => {
          return (
            <Col key={index} style={{width: "auto"}}><Square value={value}/></Col>
          );
        })}
      </Row>
      <Row align="top" justify="center">
        {[7, 8, 9].map((value, index, array) => {
          return (
            <Col key={index} style={{width: "auto"}}><Square value={value}/></Col>
          );
        })}
      </Row>
      </div>

    </div>
    </>
  );
}
