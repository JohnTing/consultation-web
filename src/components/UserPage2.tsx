import { Avatar, Button, message, Table } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";

const API_URL1 = "https://johnting-consultation-api.herokuapp.com/doctorwork";
const API_URL2 = "https://johnting-consultation-api.herokuapp.com/nursework";
const API_URL3 = "https://johnting-consultation-api.herokuapp.com/workqueue";
const API_TOKEN = "Bearer tokena";

const API_HEADERS = {
  authorization: API_TOKEN,
};

const API_HEADERS_JSON = {
  authorization: API_TOKEN,
  "content-Type": "application/json",
};

type WorkType = {
  id: number;
  work: string;
  createdAt: Date;
  updatedAt: Date;
};

type WorkTypeP = {
  id: number;
  work: string;
  type: number;
  createdAt: Date;
  updatedAt: Date;
};

const style = {
  background: "#EEEEEE",
  padding: "16px 50px",
  height: "auto",
  weight: "auto",
  fontSize: "20px",
};

export default function UserPage2() {
  const [WorkType, setState] = useState<WorkType[]>([]);

  const Square = () => {
    useEffect(() => {
      const promise1 = fetch(API_URL1, {
        method: "GET",
        headers: API_HEADERS,
      })
        .then((response) => response.json())
        .then((data) => data as WorkType[])
        .catch((e) => {
          console.log(e);
          return Array<WorkType>();
        });

      const promise2 = fetch(API_URL2, {
        method: "GET",
        headers: API_HEADERS,
      })
        .then((response) => response.json())
        .then((data) => data as WorkType[])
        .catch((e) => {
          console.log(e);
          return Array<WorkType>();
        });

      Promise.all([promise1, promise2]).then((data) => {});
    }, []);

    return (
      <Col>
        <Button shape="round" type="primary" size="large">
          d3
        </Button>
      </Col>
    );
  };

  return (
    <>
      <Row justify="center" align="top" gutter={[24, 24]}>
        <Square></Square>
      </Row>
    </>
  );
}
