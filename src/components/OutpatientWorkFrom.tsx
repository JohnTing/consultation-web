import { type } from "@testing-library/user-event/dist/type";
import { Button, List, Table } from "antd";
import React, { useEffect, useState } from "react";

const API_URL = "https://johnting-consultation-api.herokuapp.com/worktype";
const API_TOKEN = "Bearer tokena";

const API_HEADERS = {
  Authorization: API_TOKEN,
};

export enum Worker {
  Doctor = 0,
  Nurse = 1,
}

export interface Props {
  worker: Worker;
}

type WorkType = {
  id: number;
  work: string;
  type: Worker;
  createdAt: Date;
  updatedAt: Date;
};

const columns = [
  {
    title: (type: Worker) =>
      (type === Worker.Doctor ? "醫生" : "護士") + "門診工作",
    dataIndex: ["work"],
    render: (work: string) => <>{work}</>,
  },
  {
    title: <Button type="primary">新增</Button>,
    dataIndex: "id",
    render: (id: number) => (
      <Button type="dashed" danger>
        刪除
      </Button>
    ),
  },
];


function OutpatientWorkFrom(props: Props) {
  const [data, setData] = useState<WorkType[]>();

  useEffect(() => {
    fetch(API_URL, {
      method: "GET",
      headers: API_HEADERS
    })
      .then((response) => response.json())
      .then((data) => data as WorkType[])
      .then((data) => data.filter((e) => e.type === props.worker))
      .then((data) => setData(data))
      .catch((e) => {
        console.log(e);
      });
  }, [props.worker]);

  useEffect( () => {
  }, [data])

  
  return <Table dataSource={data} rowKey="id" columns={columns} />;
}

export default OutpatientWorkFrom;
