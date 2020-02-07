import React from 'react';
import { Card, Row, Button } from 'antd';
import { map } from 'lodash';
import { ITask } from './Task';
import '../styles/Asana.css';
import logo from '../asana_logo.png';
import AsanaTask from './AsanaTask';

export interface IAsanaProps {
  project?: string
}

// TODO Fetch tasks
const tasks: ITask[] = [{
  description: 'Support search asana tasks from Command Palette',
}, {
  description: 'Add pagination to Asana integration',
}]

const Asana = (props: IAsanaProps) => {
  return (
    <Card className="Asana">
      <Row className="Asana-title">Asana</Row>
      {props.project && <Row className="Asana-project">{props.project}</Row>}
      {!props.project && <Row className="Asana-connect">
        <Button className="Asana-connect-button">
          <img src={logo} className="Asana-logo" height='32px' alt=''/> Connect Asana
        </Button>
      </Row>}
      {map(tasks, task => (
        <Row key={task.description}>
          <AsanaTask {...task}/>
        </Row>
      ))}
    </Card>
  );
}

export default Asana;
