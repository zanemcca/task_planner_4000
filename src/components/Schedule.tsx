import React from 'react';
import { Col } from 'antd';

import '../styles/Schedule.css';

import DailySchedule from './DailySchedule';
import { map, groupBy, sortBy, values } from 'lodash';
import { useTasks } from '../hooks/tasks';
import moment from 'moment';

const Schedule = () => {
  const [tasks] = useTasks()
  const schedules = sortBy(values(groupBy(tasks, task => moment(task.date.format('YYYY-MM-DD'), 'YYYY-MM-DD'))), tasks => tasks[0].date)
  return (
    <div className="Schedule">
      {map(schedules, (tasks, day) => (
        <Col key={day} xs={24} md={12} lg={8}>
          <DailySchedule date={tasks[0].date} tasks={sortBy(tasks, 'created')}/>
        </Col>
      ))}
    </div>
  );
}

export default Schedule;
