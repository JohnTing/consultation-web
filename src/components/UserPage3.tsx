import { Button, PageHeader, Space } from "antd";

import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const mybutton1 = {
  height: "80px",
  width: "100%",
  minWidth: "120px",
  fontSize: '150%'
};


type Prop = {
  nextpage: string;

};

export default function UserPage2(prop: Prop) {
  const navigate = useNavigate();
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");
  const work = new URLSearchParams(search).get("work");

  const [mytimeout, setMytimeout] = useState(5);

  useEffect(() => {

    const timer1 = setInterval(() => {
      setMytimeout(mytimeout - 1)
      if (mytimeout === 0) {
        navigate(`/${prop.nextpage}`)
      }

    }, 1000);


    return () => clearInterval(timer1)
  }, [mytimeout])


  return (
    <>

      <Row justify="center" align="top">
        <Col >
          <PageHeader title={"骨科APP 就診序號:" + id}></PageHeader>
        </Col>
      </Row>
      <Row justify="center" align="top">
        <Col >

      <h3>你選取的項目為
      <Button type="primary"  style={mybutton1} onClick={() => { navigate(`/${prop.nextpage}`) }} >{work}</Button>
        </h3>
        

      <h3>登記成功</h3>
      <Button type="primary" style={mybutton1}  onClick={() => { navigate(`/${prop.nextpage}`) }} >返回主頁</Button>
      <h4>{mytimeout} 秒後自動返回主頁</h4>

      </Col>
      </Row>

    </>
  );
}
