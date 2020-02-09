
import React, { useState } from 'react';
import { Layout } from 'antd';

import '../styles/Home.css';
import asanaLogo from '../asana_logo.png';

import Schedule from './Schedule';
import Asana from './Asana';
import Commands from './Commands';
import { RouteComponentProps } from '@reach/router';
import { SiderProps } from 'antd/lib/layout';

const { Sider, Content } = Layout

const Home: React.FC<RouteComponentProps> = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  return (
    <div className="Home">
      <Commands />
      <Layout className="Home-layout">
        <Content className="Home-content">
          <Schedule />
        </Content>
        <Sider
          reverseArrow
          breakpoint="md"
          collapsible
          collapsed={isCollapsed}
          onCollapse={() => setIsCollapsed(!isCollapsed)}
          theme="light"
          width="300px"
          className="Home-sider"
        >
          {(isCollapsed && <div className="Home-collapsed-icon">
            <img src={asanaLogo} height='32px' alt=''/>
          </div>) || <Asana />}
        </Sider>
      </Layout>
    </div>
  );
}

export default Home;
