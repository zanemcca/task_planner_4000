import React from 'react';
import { Col } from 'antd';

import '../styles/Schedule.css';

import DailySchedule, { IDailySchedule } from './DailySchedule';
import { map } from 'lodash';

export interface ISchedule {
  dailySchedules: IDailySchedule[]
}

export type IScheduleProps = ISchedule

const Schedule = (props: IScheduleProps) => {
  return (
    <div className="Schedule">
      {map(props.dailySchedules, schedule => (
        <Col key={schedule.date.toLocaleString()} span={8}>
          <DailySchedule date={schedule.date} tasks={schedule.tasks}/>
        </Col>
      ))}
    </div>
  );
}

export default Schedule;
