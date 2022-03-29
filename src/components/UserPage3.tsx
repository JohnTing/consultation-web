import { Button, PageHeader, Space } from "antd";

import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const myborder = {
  maxWidth: "640px",
  margin: "auto",
  borderStyle: "groove",
};
const mybutton1 = {
  height: "auto",
  width: "120px",
};
const mybutton2 = {
  background: "#FFFF00",
  height: "auto",
  width: "120px",
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
      if(mytimeout === 0) {
        navigate(`/${prop.nextpage}`)
      }

    }, 1000);


    return () => clearInterval(timer1)
  }, [mytimeout])


  return (
    <>
      <div style={myborder}>
        <PageHeader title={"骨科APP 就診序號:" + id}></PageHeader>


        <h1>就診序號: {id}</h1>

        <h3>你選取的項目為 
          
          
          <Button type="primary" size="large" onClick={()=>{navigate(`/${prop.nextpage}`)}} >{work}</Button></h3>

        <h1>登記成功</h1>
        <h4>{mytimeout} 秒後跳轉</h4>


        
      </div>
    </>
  );
}
