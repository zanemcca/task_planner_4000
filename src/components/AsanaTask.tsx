
import React from 'react';
import {
  Row,
  Card,
} from 'antd'

import '../styles/Task.css';
import { ITask } from './Task';

export type IAsanaTaskProps = Pick<ITask, 'description'>

const AsanaTask = (props: IAsanaTaskProps) => {
  return (
    <Card className="Task">
      <Row className="Task-header">
        <div className="Task-description">{props.description}</div>
      </Row>
    </Card>
  )
}

export default AsanaTask;
