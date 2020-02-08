import React, { useEffect, useState } from 'react';
import { Card, Row, Button, Spin } from 'antd';
import { map, forEach } from 'lodash';

import '../styles/Asana.css';

import { ITask } from './Task';
import logo from '../asana_logo.png';
import AsanaTask from './AsanaTask';
import { createClient } from '../lib/asana';
import { useAsanaToken } from '../hooks/auth';
import { useAsanaTasks } from '../hooks/asana';
import CenterSpin from './CenterSpin';

export interface IAsanaProps {}

const Asana = (props: IAsanaProps) => {
  const [token] = useAsanaToken(null);
  const { tasks, workspace, loading } = useAsanaTasks()
  return (
    <Card className="Asana">
      <Row className="Asana-title">Asana</Row>
      {!token && <Row className="Asana-connect">
        <Button href={createClient().app.asanaAuthorizeUrl()} className="Asana-connect-button">
          <img src={logo} className="Asana-logo" height='32px' alt=''/> Connect Asana
        </Button>
      </Row>}
    {token && (
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
