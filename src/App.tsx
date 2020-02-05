import React from 'react';

import './App.css';

import Schedule from './components/Schedule';
import { Layout } from 'antd';

const { Sider, Content } = Layout

const Asana = () => {
  return (
    <div>Asana</div>
  )
}

const App = () => {
  return (
    <div className="App">
      <Layout className="App-layout">
        <Content className="App-content">
          <Schedule/>
        </Content>
        <Sider className="App-sider">
          <Asana/>
        </Sider>
      </Layout>
    </div>
  );
}

export default App;
