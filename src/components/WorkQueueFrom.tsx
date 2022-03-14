import { Button, message, Table } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";



const API_URL= "https://johnting-consultation-api.herokuapp.com/workqueue"
const API_TOKEN = "Bearer tokena";

const API_HEADERS = {
  authorization: API_TOKEN,
};

const API_HEADERS_JSON = {
  authorization: API_TOKEN,
  "content-Type": "application/json",
};


interface Props {

}

type WorkQueue = {
    id: number, 
    patientSerial: number, 
    doctorWork:string  , 
    nurseWork:string,
    finish:boolean,
    createdAt: Date;
}

export default function WorkQueueFrom() {
    const [dataSource, setState] = useState<WorkQueue[]>([]);

    useEffect(() => {
        fetch(API_URL, {
          method: "GET",
          headers: API_HEADERS,
        })
          .then((response) => response.json())
          .then((data) => data as WorkQueue[])
          .then((data) => setState(data))
          .catch((e) => {
            console.log(e);
          });
      }, []);
    
      const columns = [
        {
          title: '病患序號',
          dataIndex: 'id',
          key: 'id',
          render: (patientSerial:number) => <>{patientSerial}</>,
        },
        {
          title: '醫師工作項目',
          dataIndex: 'doctorWork',
          key: 'doctorWork',
          render: (doctorWork:string) => <button>{doctorWork}</button>,
        },
        {
          title: '護理師工作項目',
          dataIndex: 'nurseWork',
          key: 'nurseWork',
          render: (nurseWork:string) => <button>{nurseWork}</button>,
        },
        {
          title: '完成',
          dataIndex: 'finish',
          key: 'finish',
          render: (finish:string) => <button>{finish}</button>,
        }
      ];


      return <Table dataSource={dataSource} rowKey="id" columns={columns} />;
}