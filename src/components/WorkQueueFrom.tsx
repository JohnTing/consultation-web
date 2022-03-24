import { Button, message, Table, DatePicker, Anchor } from "antd";
import Input from "antd/lib/input/Input";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { SortOrder } from "antd/lib/table/interface";
const { RangePicker } = DatePicker;

const API_URL = "https://johnting-consultation-api.herokuapp.com/workqueue/daterange"
const API_URL2 = "https://johnting-consultation-api.herokuapp.com/workqueue"
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
  doctorWork: string,
  nurseWork: string,
  finish: boolean,
  createdAt: Date;
}




export default function WorkQueueFrom() {
  const [dataSource, setState] = useState<WorkQueue[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<[moment.Moment, moment.Moment]>([moment(), moment().add(1, "day")]);
  const abortController = new AbortController();

  function fetchData() {
    setLoading(true)
    fetch(API_URL + `?from=${timeRange[0].format("YYYY-MM-DD")}&to=${timeRange[1].format("YYYY-MM-DD")}`, {
      method: "GET",
      headers: API_HEADERS,
      signal: abortController.signal
    })
      .then((response) => response.json())
      .then((data) => data as WorkQueue[])
      .then((data) => {
        setState(data)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e);
      });
  }


  useEffect(() => {
    
    fetchData()

    return () => abortController.abort()
  }, [timeRange]);

  const deleteById = (workQueue: WorkQueue) => {
    setState(dataSource.filter((value) => value.id !== workQueue.id))
    fetch(API_URL2 + `/${workQueue.id}`, {
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


  const finishById = (event: React.MouseEvent<HTMLElement, MouseEvent>, workQueue: WorkQueue) => {
    
    const setFinish = !workQueue.finish

    
    var raw = JSON.stringify({
      "finish": setFinish
    });
    
    fetch(API_URL2 + `/${workQueue.id}`, {
      method: "PUT",
      headers: API_HEADERS_JSON,
      body: raw
    })
      .then((response) => response.json())
      .then((data: WorkQueue) => {
        console.log(data);

        if (data.finish) {
          message.success(`${data.doctorWork + data.nurseWork} 已完成`);
        }else {
          message.success(`${data.doctorWork + data.nurseWork} 未完成`);
        }
        setState(dataSource.map((e)=> {
          e.finish = e.id === workQueue.id ? setFinish: e.finish
          return e
        }))

          
      })
      .catch((e) => {
        message.error(`修改失敗: ${e}`);
        console.log(e);
      });
  }


  const columns = [

    {
      title: 'id',
      dataIndex: 'id',
      render: (id: number) => <>{id}</>,
      
      sorter: (a:WorkQueue, b:WorkQueue) => a.id - b.id, 
      defaultSortOrder: 'ascend' as SortOrder,
    },
    {
      title: '病患序號',
      dataIndex: 'patientSerial',
      key: 'patientSerial',
      render: (patientSerial: number) => <>{patientSerial}</>,
      sorter: (a:WorkQueue, b:WorkQueue) => a.patientSerial - b.patientSerial, 
      
    },
    {
      title: '醫師工作項目',
      dataIndex: 'doctorWork',
      key: 'doctorWork',
      render: (doctorWork: string) => <Button>{doctorWork}</Button>,
    },
    {
      title: '護理師工作項目',
      dataIndex: 'nurseWork',
      key: 'nurseWork',
      render: (nurseWork: string) => <Button>{nurseWork}</Button>,
    },
    {
      title: '完成',
      dataIndex: 'finish',
      key: 'finish',
      render: (text: string, record: WorkQueue, index: number) => <Button type={record.finish ? "primary" : "default"}  onClick={(e) => finishById(e, record)} >{record.finish ? "已完成" : "未完成"}</Button>,
    },
    {
      title: '刪除',
      dataIndex: 'finish',
      key: 'finish',
      render: (text: string, record: WorkQueue, index: number) => <Button danger onClick={() => deleteById(record)}>刪除</Button>,
    }, 
    
  ];


  return <>
  <RangePicker size="large" defaultValue={[moment(), moment()]} value={timeRange} onChange={(dates, dateStrings) => {
    setTimeRange([dates?.[0] ?? moment() , dates?.[1] ?? moment()])
  
  }} />
  <Button onClick={()=> {fetchData()}} >{"重新整理"}</Button>
  <Table dataSource={dataSource} rowKey="id" columns={columns} loading={loading} />
  </>;
}