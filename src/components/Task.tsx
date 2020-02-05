
import React from 'react';
import {
  Col,
  Row,
  Card,
  Icon
} from 'antd'
import moment from 'moment';

import '../styles/Task.css';
import { IconProps } from 'antd/lib/icon';

export interface ITask {
  description: string
  time?: moment.Duration
  channel?: string
  complete?: boolean
}

export type ITaskProps = ITask

const Task = (props: ITaskProps) => {
  const taskCompleteIconProps: IconProps = {
    type: 'check-circle',
    style: {
      height: 20,
      width: 20
    }
  }

  if (props.complete) {
    taskCompleteIconProps.theme = 'twoTone'
    taskCompleteIconProps.twoToneColor = '#52c41a'
  }

  return (
    <Card className="Task">
      <Row className="Task-header">
        <div className="Task-description">{props.description}</div>
        {props.time && <div className="Task-time">{props.time.humanize()}</div>}
      </Row>
      <Row className="Task-footer">
        <Col span={3} className="Task-complete">
          <Icon {...taskCompleteIconProps} />
        </Col>
        <Col span={21} className="Task-channel">{props.channel && `#${props.channel}`}</Col>
      </Row>
    </Card>
  )
}

export default Task;
