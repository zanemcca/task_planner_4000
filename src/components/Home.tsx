
import React from 'react';
import { Layout, message } from 'antd';
import moment from 'moment';

import '../styles/Home.css';

import Schedule from './Schedule';
import { IDailySchedule } from './DailySchedule';
import Asana from './Asana';
import Commands from './Commands';
import { RouteComponentProps } from '@reach/router';
import { client } from '../lib/asana';

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
  project: undefined
}

const Home: React.FC<RouteComponentProps> = (props) => {
  console.log(props)
    /*
  React.useEffect(() => {
    if (props.location && props.location.pathname === '/auth/callback/asana') {
      // TODO Fix cors issues
      // TODO Save token to local storage
      //  Create a context to save the storage
      // TODO Navigate back to home
      console.log(props.location.href)
      const code = props.location.search
      client.app.accessTokenFromCode(code).then(message.info).catch(message.error)
    }
  })
     */

  return (
    <div className="Home">
      <Commands />
      <Layout className="Home-layout">
        <Content className="Home-content">
          <Schedule dailySchedules={schedules}/>
        </Content>
        <Sider theme="light" width='25%' className="Home-sider">
          <Asana project={asana.project}/>
        </Sider>
      </Layout>
    </div>
  );
}

export default Home;
