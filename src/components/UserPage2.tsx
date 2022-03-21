import { Button, message, PageHeader, Space } from "antd";

import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const API_URL1 = "https://johnting-consultation-api.herokuapp.com/doctorwork";
const API_URL2 = "https://johnting-consultation-api.herokuapp.com/nursework";
/*
const API_URL1 = "https://data.heroku.com/dataclips/kbrioabbsbofzweaoayveibjfmna.json";
const API_URL2 = "https://data.heroku.com/dataclips/huzkrbywvumommzbczlxlnjojalm.json";
*/
const API_URL3 = "https://johnting-consultation-api.herokuapp.com/workqueue";
const API_TOKEN = "Bearer tokena";

const API_HEADERS = {
  authorization: API_TOKEN,
};

const API_HEADERS_JSON = {
  authorization: API_TOKEN,
  "content-Type": "application/json",
};

// type WorkType = [string, string];

type WorkType = {
  id: number;
  work: string;
  createdAt: Date;
  updatedAt: Date;
};

type WorkQueue = {
  patientSerial: number;
  doctorWork: string;
  nurseWork: string;
  finish: boolean;
};

type Dataclips = {
  title: string;
  values: WorkType[];
};

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
  returnpage: string;
};

export default function UserPage2(prop: Prop) {
  const [works, setState] = useState<[WorkType[], WorkType[]]>([[], []]);
  const navigate = useNavigate();

  const [swork, setSwork] = useState<WorkQueue>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const search = useLocation().search;
  const id = new URLSearchParams(search).get("id");

  useEffect(() => {
    setIsLoading(true)
    const promise1 = fetch(API_URL1, {
      method: "GET",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      //.then((data) => data as Dataclips)
      //.then((data) => data.values)
      .catch((e) => {
        console.log(e);
        return Array<WorkType>();
      });

    const promise2 = fetch(API_URL2, {
      method: "GET",
      headers: API_HEADERS,
    })
      .then((response) => response.json())
      //.then((data) => data as Dataclips)
      //.then((data) => data.values)
      .catch((e) => {
        console.log(e);
        return Array<WorkType>();
      });

    Promise.all([promise1, promise2]).then((datas) => {
      setState([datas[0], datas[1]]);
      setIsLoading(false)
    });
  }, []);


  const postbutton = (serial: number, work: string, type: number) => {
    return (
      <Col key={serial}>
        <Button
          //shape="round"
          type="primary"
          size="large"
          style={mybutton1}
          onClick={() => {
            let workQueue: WorkQueue = {
              patientSerial: serial,
              doctorWork: type === 0 ? work : "",
              nurseWork: type === 1 ? work : "",
              finish: false,
            };

            setSwork(workQueue);
          }}
        >
          {work}
        </Button>
      </Col>
    );
  };
  let index = 0;
  return (
    <>
      <div style={myborder}>
        <PageHeader title={"骨科APP 就診序號:" + id}></PageHeader>

        <Row gutter={[16, 16]} justify="center" align="top">
          {works[0].map((work) => {
            index++;
            return postbutton(index, work.work, 0);
          })}
          {works[1].map((work) => {
            index++;
            return postbutton(index, work.work, 1);
          })}
          <Col>
            <Button
              size="large"
              style={mybutton2} 
              loading={isLoading} 
              disabled={!swork}
              onClick={() => {
                if (!swork) {
                  message.error("請輸入看診項目");
                  return;
                }
                if (!id || id.length <= 0) {
                  message.error("請輸入就診序號");
                  return;
                }

                fetch(API_URL3, {
                  method: "POST",
                  body: JSON.stringify(swork),
                  headers: API_HEADERS_JSON,
                })
                  .then((res) => res.json())
                  .then((res) => console.log(res))
                  .catch((e) => console.log(e));

                navigate(
                  `/${prop.nextpage}?id=${id}&work=${
                    swork.nurseWork + swork.doctorWork
                  }`
                );
              }}
            >
              {"確認"}
            </Button>
          </Col>
          <Col>
            <a href={prop.returnpage}>
              <Button size="large" style={mybutton1} loading={isLoading}>
                {"取消"}
              </Button>
            </a>
          </Col>
        </Row>
      </div>
    </>
  );
}
