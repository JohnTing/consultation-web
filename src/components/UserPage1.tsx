import { Avatar, Button, message, Table } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const style = {
  background: "#EEEEEE",
  padding: "16px 50px",
  height: "auto",
  weight: "auto",
  fontSize: "20px",
};

const TextContext = React.createContext("light");

export default function UserPage1() {
  const [mytext, setState] = useState<string>("");

  const Square = (props: { value: number }) => {
    return (
      <Button style={style} onClick={() => setState(mytext + props.value)}>
        {props.value}
      </Button>
    );
  };
  const Board = () => {
    return (
      <>
        <Row align="middle" justify="center">
          就診序號<Input value={mytext}></Input>
        </Row>

        <Row align="middle" justify="center">
          <Square value={1}></Square>
          <Square value={2}></Square>
          <Square value={3}></Square>
        </Row>
        <Row align="middle" justify="center">
          <Square value={4}></Square>
          <Square value={5}></Square>
          <Square value={6}></Square>
        </Row>
        <Row align="middle" justify="center">
          <Square value={7}></Square>
          <Square value={8}></Square>
          <Square value={9}></Square>
        </Row>
        <Row align="middle" justify="center">
          <Square value={0}></Square>
          <Square value={0}></Square>
          <Square value={0}></Square>
        </Row>
        <Row align="middle" justify="center">
          <Link to="/UserPage2">
            {"送出"}
          </Link>
        </Row>
      </>
    );
  };

  return (
    <>
      <Board></Board>
    </>
  );
}
