
import React, { useState } from "react";
import { Button, Col, message, PageHeader, Row } from "antd";

import { useNavigate } from 'react-router-dom';


const myborder1 = {
};

const mybutton1 = {
  width: "120px", 
  height: "120px",
  fontSize: '250%'
};

const mybutton2 = {
  width: "120px", 
  height: "80px",
  fontSize: '150%'
};

type Prop = {
  nextpage: string;
};

export default function UserPage1(prop: Prop) {
  const navigate = useNavigate()


  const [mytext, setState] = useState<string>("");

  const Square = (props: { value: string }) => {
    return (
      <Button
      type="default"
        style={mybutton1}
        onClick={() => {
          
          if (mytext.length >= 3) {
            // message.error("就診序號不能超過三位數，請重新輸入")
            return
          }
      
          setState(mytext + props.value)
    
        }}
        
      >
        {props.value}
      </Button>
    );
  };


  function detal() {
    const now = new Date()
    
    return ( now.getHours() <= 12 ? "上午診" : "下午診" ) + " XXX 醫師"
  }

  return (
    <>
      <Row justify="center" align="top">
        <Col >
          <PageHeader title={"骨科APP 就診序號:" + mytext}></PageHeader>
          
          
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col >
        
          <h2>{detal()}</h2>
        </Col>
      </Row>




      <div style={{height:"100%"}}>

      <Row align="top" justify="center" style={myborder1}>
        {['1', '2', '3'].map((value, index, array) => {
          return (
            <Col key={index} style={myborder1}>
              <Square value={value} />
            </Col>
          );
        })}
      </Row>
      <Row align="top" justify="center" style={myborder1}>
        {['4', '5', '6'].map((value, index, array) => {
          return (
            <Col key={index} style={myborder1}>
              <Square value={value} />
            </Col>
          );
        })}
      </Row>
      <Row align="top" justify="center" style={myborder1}>
        {['7', '8', '9'].map((value, index, array) => {
          return (
            <Col key={index} style={myborder1}>
              <Square value={value} />
            </Col>
          );
        })}
      </Row>
      <Row align="top" justify="center" style={myborder1}>
        {['', '0', ''].map((value, index, array) => {
          return (
            <Col key={index} style={myborder1}>
              <Square value={value} />
            </Col>
          );
        })}
      </Row>
      </div>
        <br/>
      <Row align="top" justify="center" gutter={[24, 24]}>
        <Col key={"就診序號"}>

          <Button type="primary" style={mybutton2} onClick={() => {
            if (mytext.length <= 0) {
              message.error("請輸入就診序號")
              return
            }
            if (mytext.length > 3) {
              message.error("就診序號不能超過三位數，請重新輸入")
              return
            }



            navigate(`/${prop.nextpage}?id=${mytext}`)
          }} >
            確認
          </Button>
        </Col>
        <Col key={"重新輸入"} >
          <Button style={mybutton2} type="dashed" onClick={() => setState("")}>
            重新輸入
          </Button>
        </Col>
      </Row>
    </>
  );
}
