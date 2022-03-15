import { Avatar, Button, message, Table } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import { createFalse } from "typescript";

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

type WorkQueue = {
  patientSerial: number;
  doctorWork: string;
  nurseWork: string;
  finish: boolean;
};

const style = {
  background: "#EEEEEE",
  height: "auto",
  weight: "auto",
  fontSize: "48px",
};

export default function UserPage2() {
  const [works, setState] = useState<[WorkType[], WorkType[]]>([[], []]);

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

    Promise.all([promise1, promise2]).then((datas) => {
      setState(datas);
    });
  }, []);

  const postbutton = (serial: number, work: string, type: number) => {
    return (
      <Col key={serial} >
        <Button
          //shape="round"
          //type="primary"
          //size="large"
          style={style}
          onClick={() => {
            let workQueue: WorkQueue = {
              patientSerial: serial,
              doctorWork: type === 0 ? work : "",
              nurseWork: type === 1 ? work : "",
              finish: false,
            };

            fetch(API_URL3, {
              method: "POST",
              body: JSON.stringify(workQueue),
              headers: API_HEADERS_JSON,
            })
              .then((res) => res.json())
              .then((res) => console.log(res))
              .catch((e) => console.log(e));
          }}
        >
          {work}
        </Button>
      </Col>
    );
  };

  useEffect(() => {
    console.log(works);
  }, [works]);

  let index = 0;
  return (
    <>
      <Row justify="center" align="top" gutter={[16, 16]}>
        {works[0].map((work) => {
          index++;
          return postbutton(index, work.work, 0);
        })}
        {works[1].map((work) => {
          index++;
          return postbutton(index, work.work, 1);
        })}
      </Row>
    </>
  );
}
