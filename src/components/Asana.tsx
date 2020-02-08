import React, { useEffect, useState } from 'react';
import { Card, Row, Button } from 'antd';
import { map } from 'lodash';

import '../styles/Asana.css';

import { ITask } from './Task';
import logo from '../asana_logo.png';
import AsanaTask from './AsanaTask';
import { createClient } from '../lib/asana';
import { useAsanaToken } from '../hooks/auth';

export interface IAsanaProps {
  project?: string
}

const mapAsanaTaskToTask = ({ name, completed }: any) => ({
  description: name,
  complete: completed
})

const Asana = (props: IAsanaProps) => {
  const [token] = useAsanaToken(null);
  const [tasks, setTasks] = useState<ITask[]>([])
  const [workspace, setWorkspace] = useState<string | undefined>()
  useEffect(() => {
    if (token !== undefined && token !== null) {
      const client = createClient(token!)
      client.users.me()
        .then(user => {
          console.log(user)
          const userId = user.gid;
          // The user's "default" workspace is the first one in the list, though
          // any user can have multiple workspaces so you can't always assume this
          // is the one you want to work with.
          const workspaceId = user.workspaces[0].gid;
          setWorkspace(user.workspaces[0].name)
          return client.tasks.findAll({
            assignee: parseInt(userId),
            workspace: parseInt(workspaceId),
            completed_since: 'now',
            opt_fields: 'id,name,assignee_status,completed'
          });
        })
        .then(response => {
          // There may be more pages of data, we could stream or return a promise
          // to request those here - for now, let's just return the first page
          // of items.
          console.log(response)
          console.log(map(response.data, mapAsanaTaskToTask))
          setTasks(map(response.data, mapAsanaTaskToTask))
        })
    }
  }, [token])

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
        <Row className="Asana-project">{
          workspace
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
