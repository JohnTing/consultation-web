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
    
      const deleteById = (workQueue:WorkQueue) => {
        setState(dataSource.filter((value) => value.id !== workQueue.id))
        fetch(API_URL + `/${workQueue.id}`, {
        method: "DELETE",
        headers: API_HEADERS,
      })
        .then((response) => response.json())
        .then((data: WorkQueue) => {
          message.success(`成功刪除 ${data.doctorWork + data.nurseWork}`);
        })
        .catch((e) => {
          message.error(`刪除失敗: ${e}`);
          console.log(e);
        });
      }


      const columns = [
        {
          title: '病患序號',
          dataIndex: 'patientSerial',
          key: 'patientSerial',
          render: (patientSerial:number) => <>{patientSerial}</>,
        },
        {
          title: '醫師工作項目',
          dataIndex: 'doctorWork',
          key: 'doctorWork',
          render: (doctorWork:string) => <Button>{doctorWork}</Button>,
        },
        {
          title: '護理師工作項目',
          dataIndex: 'nurseWork',
          key: 'nurseWork',
          render: (nurseWork:string) => <Button>{nurseWork}</Button>,
        },
        {
          title: '完成',
          dataIndex: 'finish',
          key: 'finish',
          render: (finish:string) => <Button>{finish}</Button>,
        }, 
        {
          title: '刪除',
          dataIndex: 'finish',
          key: 'finish',
          render: (text:string, record:WorkQueue, index:number) => <Button onClick={()=>deleteById(record)}>刪除</Button>,
        }
      ];


      return <Table dataSource={dataSource} rowKey="id" columns={columns} />;
}