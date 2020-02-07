import React from 'react';

import './App.css';

import Schedule from './components/Schedule';
import { Layout } from 'antd';
import moment from 'moment';
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

const today = moment()

const schedules: IDailySchedule[] = [{
  date: today,
  tasks: [{
    description: 'Review PR for Task Planner 4000',
    channel: channels.default,
    time: moment.duration('01:00:00'),
  }, {
    description: 'Review emails',
    complete: true,
  }]
}, {
  date: moment(today).add(1, 'd'),
  tasks: [{
    description: 'Write up weekly check in',
    channel: channels.default,
    time: moment.duration('00:30:00'),
  }, {
    description: 'Deploy beta command palette.',
    channel: channels.personal,
  }]
}, {
  date: moment(today).add(2, 'd'),
  tasks: [{
    description: 'Set up CI for mobile project',
    complete: true,
    time: moment.duration('00:15:00'),
  }, {
    description: 'Review new user reported issues',
    channel: channels.personal,
    time: moment.duration('00:30:00'),
  }]
}]

const asana = {
  project: 'Backlog'
}

const App = () => {
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
