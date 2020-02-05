import React from 'react';

import './App.css';

import Schedule from './components/Schedule';
import { Layout } from 'antd';
import moment from 'moment';
import { IDailySchedule } from './components/DailySchedule';

const { Sider, Content } = Layout

const Asana = () => {
  return (
    <div>Asana</div>
  )
}

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

  return (
    <div className="App">
      <Layout className="App-layout">
        <Content className="App-content">
          <Schedule dailySchedules={schedules}/>
        </Content>
        <Sider className="App-sider">
          <Asana/>
        </Sider>
      </Layout>
    </div>
  );
}

export default App;
