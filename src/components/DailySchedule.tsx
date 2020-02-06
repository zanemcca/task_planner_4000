import React from 'react';
import {
  Row, Card
} from 'antd';
import {
  map
} from 'lodash';
import moment from 'moment';

import '../styles/DailySchedule.css';
import Task, { ITask} from './Task';

export interface IDailySchedule {
  date: moment.Moment
  tasks: ITask[]
}

export type IDailyScheduleProps = IDailySchedule

const DailySchedule = (props: IDailyScheduleProps) => {
  return (
    <Card className="DailySchedule">
      <Row className="DailySchedule-day">{props.date.format('dddd')}</Row>
      <Row className="DailySchedule-date">{props.date.format('MMMM D')}</Row>
      {map(props.tasks, task => (
        <Row key={task.description}>
          <Task {...task}/>
        </Row>
      ))}
    </Card>
  );
}

export default DailySchedule;
