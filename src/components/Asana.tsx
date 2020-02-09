import React from 'react';
import { Card, Row, Button, Spin } from 'antd';
import { map } from 'lodash';

import '../styles/Asana.css';

import logo from '../asana_logo.png';
import AsanaTask from './AsanaTask';
import { useClient } from '../lib/asana';
import { useAsanaTasks, useAsanaCredentials } from '../hooks/asana';

export interface IAsanaProps {}

const Asana = (props: IAsanaProps) => {
  const [credentials] = useAsanaCredentials();
  const isAsanaAuthorized = !!credentials.access_token
  const { tasks, workspace, loading } = useAsanaTasks()
  const client = useClient()
  return (
    <Card className="Asana">
      <Row className="Asana-title">Asana</Row>
      {!isAsanaAuthorized && <Row className="Asana-connect">
        <Button href={client.app.asanaAuthorizeUrl()} className="Asana-connect-button">
          <img src={logo} className="Asana-logo" height='32px' alt=''/> Connect Asana
        </Button>
      </Row>}
    {isAsanaAuthorized && (
      <React.Fragment>
        <Row className="Asana-project">{workspace}</Row>
        {loading && <Row className="Asana-loading">
          <Spin />
        </Row>}
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
