import React from 'react';
import { Card, Row, Button } from 'antd';
import { map } from 'lodash';

import '../styles/Asana.css';

import { ITask } from './Task';
import logo from '../asana_logo.png';
import AsanaTask from './AsanaTask';
import { client } from '../lib/asana';
import { useAsanaToken } from '../hooks/auth';

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
  const [token] = useAsanaToken();
  // TODO Setup the asana client
  // TODO fetch the asana tasks
  return (
    <Card className="Asana">
      <Row className="Asana-title">Asana</Row>
      {!token && <Row className="Asana-connect">
        <Button href={client.app.asanaAuthorizeUrl()} className="Asana-connect-button">
          <img src={logo} className="Asana-logo" height='32px' alt=''/> Connect Asana
        </Button>
      </Row>}
    {token && (
      <React.Fragment>
        <Row className="Asana-project">{
          props.project
        }</Row>
        {map(tasks, task => (
          <Row key={task.description}>
            <AsanaTask {...task}/>
          </Row>
        ))}
      </React.Fragment>
    )}
    </Card>
  );
}

export default Asana;
