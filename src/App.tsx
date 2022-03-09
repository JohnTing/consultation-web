import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Button } from 'antd';

export interface Props {
  target: string;
}

function App(prop: Props) {
  const target = prop.target
  return (
    <div className="App">
      <header className="App-header">
        
          Hello {target}
        <Button type="primary">Button</Button>
      </header>
    </div>
  );
}

export default App;
