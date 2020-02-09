
import React from 'react';
import { Layout } from 'antd';

import '../styles/Home.css';

import Schedule from './Schedule';
import Asana from './Asana';
import Commands from './Commands';
import { RouteComponentProps } from '@reach/router';

const { Sider, Content } = Layout

const Home: React.FC<RouteComponentProps> = (props) => {
  return (
    <div className="Home">
      <Commands />
      <Layout className="Home-layout">
        <Content className="Home-content">
          <Schedule />
        </Content>
        <Sider theme="light" width='25%' className="Home-sider">
          <Asana />
        </Sider>
      </Layout>
    </div>
  );
}

export default Home;
