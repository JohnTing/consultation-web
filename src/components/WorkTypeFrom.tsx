import { type } from '@testing-library/user-event/dist/type';
import { List } from 'antd';
import React from 'react';





const testdata = [
  {
    work: 'Ant Design Title 1',
  },
  {
    work: 'Ant Design Title 2',
  },
  {
    work: 'Ant Design Title 3',
  },
  {
    work: 'Ant Design Title 4',
  },
];

type WorkType = {
  "id": number,
  "patientSerial": number,
  "work": string,
  "type": number,
  "finish": boolean,
  "createdAt": Date,
  "updatedAt": Date
}

function WorkTypeFrom() {


  return (
    <List
      itemLayout="horizontal"
      dataSource={testdata}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            title={<a href="https://ant.design">{item.work}</a>}
            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
        </List.Item>
      )}
    />
  )
}



export default WorkTypeFrom;
