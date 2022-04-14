import { Button, message, PageHeader, Radio, Space } from "antd";

import React, { useEffect, useState } from "react";

import { Row, Col } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MySteps from "./mySteps";

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
/*
type Dataclips = {
  title: string;
  values: WorkType[];
};
*/
const myborder = {
  // maxWidth: "480px",
  // margin: "auto",
  // borderStyle: "groove",
};
const mybutton1 = {
  display: "table",
  height: "auto",
  width: "100%",
  minWidth: "80px",
  fontSize: '22px',
  padding: "10px 5px",

};
const mybutton2 = {
  display: "table",
  height: "auto",
  minHeight: "60px",
  width: "100%",
  minWidth: "100px",
  fontSize: '22px',
  padding: "10px 5px",
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
  const ParamId = new URLSearchParams(search).get("id");
  const patientSerial = ParamId ? parseInt(ParamId) : -1



  const abortController = new AbortController();






  useEffect(() => {
    setIsLoading(true)


    const workTypeSessionData = sessionStorage.getItem('workTypeSessionData');
    if (workTypeSessionData && workTypeSessionData.length > 10) {
      console.log("workTypes load from sessionStorage.");
      setState(JSON.parse(workTypeSessionData));
      setIsLoading(false);

    } else {

      console.log("workTypes load from API.");
      const promise1 = fetch(API_URL1, {
        method: "GET",
        headers: API_HEADERS,
        signal: abortController.signal
      })
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
          return Array<WorkType>();
        });

      const promise2 = fetch(API_URL2, {
        method: "GET",
        headers: API_HEADERS,
        signal: abortController.signal
      })
        .then((response) => response.json())
        .catch((e) => {
          console.log(e);
          return Array<WorkType>();
        });

      Promise.all([promise1, promise2]).then((datas) => {

        sessionStorage.setItem('workTypeSessionData', JSON.stringify([datas[0], datas[1]]));

        setState([datas[0], datas[1]]);
        setIsLoading(false)
      });
    }





    return () => abortController.abort()
  }, []);


  const postbutton = (serial: number, work: string, type: number) => {
    return (

      <Col key={serial} span="8" >

        <Radio.Button value={work}

          style={mybutton1}
          onClick={() => {
            let workQueue: WorkQueue = {
              patientSerial: patientSerial,
              doctorWork: type === 0 ? work : "",
              nurseWork: type === 1 ? work : "",
              finish: false,
            };

            setSwork(workQueue);
          }}
        >

          {work}



        </Radio.Button>

      </Col>
    );
  };
  let index = 0;
  return (
    <>
      <Row justify="center" align="top">
        <Col >

          <h1>就診序號: </h1>
        </Col>
        <Col >
          <h1>{patientSerial}</h1>
        </Col>
      </Row>
      <MySteps step={1}></MySteps>



      <Row justify="center" align="top" style={{ width: "100%", margin: "auto", textAlign: "center" }}>
        <Col style={myborder}>

          <Radio.Group defaultValue="" buttonStyle="solid">

            <Row gutter={[16, 16]} justify="center" align="top">
              {works[0].map((work) => {
                index++;
                return postbutton(index, work.work, 0);
              })}
              {works[1].map((work) => {
                index++;
                return postbutton(index, work.work, 1);
              })}

            </Row>

          </Radio.Group>

          <br />
          <br></br>

          <Row justify="center" align="top" gutter={[24, 24]} >
            <Col>
              <Button
                style={mybutton2}
                loading={isLoading}
                disabled={!swork}
                type="primary"
                onClick={() => {
                  if (!swork) {
                    message.error("請輸入看診項目");
                    return;
                  }
                  if (patientSerial <= 0) {
                    message.error("請輸入就診序號");
                    return;
                  }
                  setIsLoading(true);
                  fetch(API_URL3, {
                    method: "POST",
                    body: JSON.stringify(swork),
                    headers: API_HEADERS_JSON,
                  })
                    .then((res) => res.status === 200 ? res.json() : Promise.reject(res))
                    .then((res) => {
                      console.log(res)
                      setIsLoading(false);
                      navigate(
                        `/${prop.nextpage}?id=${patientSerial}&work=${swork.nurseWork + swork.doctorWork
                        }`
                      );
                    }
                    )
                    .catch((e) => {
                      console.log(e);


                      message.error("錯誤:" + e);
                    });


                }}
              >
                {"確認"}
              </Button>
            </Col>
            <Col>
              <Link to={"/" + prop.returnpage}>
                <Button loading={isLoading} style={mybutton2}>
                  {"取消"}
                </Button>
              </Link>

            </Col>
          </Row>

        </Col>
      </Row>
    </>
  );
}
