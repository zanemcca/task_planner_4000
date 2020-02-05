import React from 'react';
import moment from 'moment';
import { Col } from 'antd';

import '../styles/Schedule.css';

import DailySchedule from './DailySchedule';
import { ITask } from './Task';


const Schedule = () => {
  const today = moment()
  const tasks: ITask[] = [{
    description: 'Hello',
    channel: 'default',
    time: moment.duration('01:00:00'),
  }, {
    description: 'World',
    time: moment.duration('01:30:00'),
  }]

  return (
    <div className="Schedule">
      <Col span={8}>
        <DailySchedule date={today} tasks={tasks}/>
      </Col>
      <Col span={8}>
        <DailySchedule date={today.days(1)} tasks={tasks}/>
      </Col>
      <Col span={8}>
        <DailySchedule date={today.days(2)} tasks={tasks}/>
      </Col>
    </div>
  );
}

export default Schedule;
