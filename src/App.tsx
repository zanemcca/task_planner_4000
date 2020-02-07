import React from 'react';

import './App.css';

import Schedule from './components/Schedule';
import { Layout, Button } from 'antd';
import moment from 'moment';
import CommandPalette from 'react-command-palette';
import { IDailySchedule } from './components/DailySchedule';
import Asana from './components/Asana';
import Commands from './components/Commands';

const { Sider, Content } = Layout

const channels = {
  default: {
    title: 'default',
    color: 'red'
  },
  personal: {
    title: 'personal',
    color: 'blue'
  }
}

const App = () => {
  const today = moment()
  const schedules: IDailySchedule[] = [{
    date: today,
    tasks: [{
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a sapien orci. Integer efficitur nunc sem, tristique lacinia lorem egestas at. Sed iaculis purus non nisl aliquet, tempor efficitur risus ornare. Aenean sapien lectus, varius quis lacus eget, facilisis ultricies leo.',
      channel: channels.default,
      time: moment.duration('01:00:00'),
    }, {
      description: 'Nam malesuada massa odio.',
      complete: true,
    }]
  }, {
    date: moment(today).add(1, 'd'),
    tasks: [{
      description: 'Aliquam vel massa accumsan, accumsan ex eu, posuere nunc.',
      channel: channels.default,
      time: moment.duration('00:30:00'),
    }, {
      description: 'Nam malesuada massa odio.',
      channel: channels.personal,
    }]
  }, {
    date: moment(today).add(2, 'd'),
    tasks: [{
      description: 'Vestibulum consequat dictum arcu sit amet pellentesque.',
      complete: true,
      time: moment.duration('00:15:00'),
    }, {
      description: 'Nullam magna leo, porttitor non semper quis, tempor quis leo.',
      channel: channels.personal,
      time: moment.duration('00:30:00'),
    }]
  }]

  const asana = {
    project: 'Backlog'
  }

  return (
    <div className="App">
      <Commands />
      <Layout className="App-layout">
        <Content className="App-content">
          <Schedule dailySchedules={schedules}/>
        </Content>
        <Sider theme="light" width='25%' className="App-sider">
          <Asana project={asana.project}/>
        </Sider>
      </Layout>
    </div>
  );
}

export default App;
