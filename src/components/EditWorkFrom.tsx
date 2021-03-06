import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { Button, message, Spin, Table } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";


const API_TOKEN = "Bearer tokena";

const API_HEADERS = {
  authorization: API_TOKEN,
};

const API_HEADERS_JSON = {
  authorization: API_TOKEN,
  "content-Type": "application/json",
};

export enum Worker {
  Doctor = 0,
  Nurse = 1,
}

const typeData = {
  [Worker.Doctor]: {
    WORKER_NAME: "醫生",
    API_URL: "https://johnting-consultation-api.herokuapp.com/doctorwork",
  },
  [Worker.Nurse]: {
    WORKER_NAME: "護士",
    API_URL: "https://johnting-consultation-api.herokuapp.com/nursework",
  },
};

export interface Props {
  worker: Worker;
}

type WorkType = {
  id: number;
  work: string;
  createdAt: Date;
  updatedAt: Date;
};

export default function OutpatientWorkFrom(props: Props) {
  const [dataSource, setState] = useState<WorkType[]>([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(true);

  const API_URL = typeData[props.worker].API_URL;
  const WORKER_NAME = typeData[props.worker].WORKER_NAME;

  useEffect(() => {
    setLoading(true)
    
    const abortController = new AbortController();
    fetch(API_URL, {
      method: "GET",
      headers: API_HEADERS,
      signal: abortController.signal
    })
      .then((response) => response.json())
      .then((data) => data as WorkType[])
      .then((data) => {
        setState(data)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e);
      });

      return () => abortController.abort()
  }, [API_URL, props.worker]);

  // useEffect(() => {}, [dataSource]);

  const columns = [
    {
      title: (type: Worker) => WORKER_NAME + "門診工作",
      dataIndex: ["work"],
      render: (work: string) => <>{work}</>,
    },
    {
      title: (
        <>
          <Button type="primary" onClick={() => handleAdd()}>
            新增
          </Button>
          <Input
            id="myinput"
            style={{ width: "50%" }}
            onChange={e => {
              setInput(e.target.value);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter') handleAdd();
            }}
          ></Input>
        </>
      ),

      dataIndex: "id",
      render: (id: number) => (
        <Button type="dashed" danger onClick={() => handleDelete(id)}>
          刪除
        </Button>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    setState(dataSource.filter((item) => item.id !== id));



    fetch(API_URL + `/${id}`, {
      method: "DELETE",
      headers: API_HEADERS
    })
      .then((response) => response.json())
      .then((data: WorkType) => {
        message.success(`成功刪除 ${data.work}`);
        // setState(dataSource.filter((item) => item.id !== id));
      })
      .catch((e) => {
        message.error(`刪除失敗: ${e}`);
        console.log(e);
      });
  };

  const handleAdd = () => {
    const work = input.trim();

    if (input.length <= 0) {
      message.warning("輸入不可為空");
      return;
    }
    for (let d of dataSource) {
      if (d.work === work) {
        message.warning("重複的項目");
        return;
      }
    }

    let raw = JSON.stringify({
      work: work,
    });

    fetch(API_URL, {
      method: "POST",
      headers: API_HEADERS_JSON,
      body: raw,
    })
      .then(async (response) => {
        if (response.ok) return response.json();

        throw new Error(await response.text());
      })
      .then((data: WorkType) => {
        console.log(data);
        message.success(`成功新增 ${data.work}`);
        setState([...dataSource, data]);
      })
      .catch((e) => {
        message.error(`新增失敗 ${e}`);
        console.log(e);
      });
  };

  return <Table dataSource={dataSource} rowKey="id" columns={columns} loading={loading} />
}
