
import React from 'react';
import CommandPalette from 'react-command-palette';
import { Button, message } from 'antd';

import asanaLogo from '../asana_logo.png';
import sunsamaLogo from '../sunsama_logo.png';
import '../styles/Commands.css';
import AsanaTaskCreateForm from './forms/AsanaTaskCreate';
import { useAsanaToken } from '../hooks/auth';
import { createClient } from '../lib/asana';

const theme = {
  container: 'atom-container',
  containerOpen: 'atom-containerOpen',
  content: 'atom-content',
  header: 'atom-header',
  input: 'custom-input',
  inputFocused: 'custom-inputFocused',
  inputOpen: 'atom-inputOpen',
  modal: 'custom-modal',
  overlay: 'atom-overlay',
  spinner: 'atom-spinner',
  suggestion: 'custom-suggestion',
  suggestionFirst: 'atom-suggestionFirst',
  suggestionHighlighted: 'custom-suggestionHighlighted',
  suggestionsContainer: 'custom-suggestionsContainer',
  suggestionsContainerOpen: 'custom-suggestionsContainerOpen',
  suggestionsList: 'atom-suggestionsList',
  trigger: 'atom-trigger'
}

const Command = (props: any) => {
  const { color, name, icon } = props;
  return (
    <div style={{ color }}>
      {icon && <img src={icon} className="Command-icon" height='32px' alt=''/>}
      <span>{name}</span>
    </div>
  );
}

const Commands = () => {
  const [isAsanaTaskFormVisible, setIsAsanaTaskFormVisible] = React.useState(false);
  const [asanaFormRef, setAsanaFormRef] = React.useState()
  const [token] = useAsanaToken(null);

  const commands = [{
    name: 'Create Task',
    icon: sunsamaLogo,
    command: () => message.success('Creating a task is coming soon')
  }, {
    name: token ? 'Create Asana Task' : 'Connect to Asana',
    icon: asanaLogo,
    command: () => {
      if (!token) {
        window.location.replace(createClient().app.asanaAuthorizeUrl())
      } else {
        setIsAsanaTaskFormVisible(true)
      }
    }
  }]

  const handleAsanaTaskCreateCancel = () => {
    const { form } = asanaFormRef.props;
    form.resetFields();
    setIsAsanaTaskFormVisible(false)
  }

  const handleAsanaTaskCreate = async () => {
    const { form } = asanaFormRef.props;
    form.validateFields(async (err: Error | null, values: any) => {
      if (err) {
        return;
      }

      const client = createClient(token!)
      const me = await client.users.me()
      const workspace = me.workspaces[0]
      const res = await client.tasks.create({
        assignee: me.gid,
        workspace: workspace.gid,
        name: values.title
      } as any)
      form.resetFields();
      setIsAsanaTaskFormVisible(false)
    });
  }

  return (
    <div className="Commands-button-wrapper">
      <AsanaTaskCreateForm
        wrappedComponentRef={setAsanaFormRef}
        visible={isAsanaTaskFormVisible}
        onCancel={handleAsanaTaskCreateCancel}
        onCreate={handleAsanaTaskCreate}
      />
      <CommandPalette
        theme={theme}
        hotKeys='command+k'
        closeOnSelect={true}
        resetInputOnClose={true}
        renderCommand={Command}
        trigger={<Button>
          ⌘+k (Command Palette)
        </Button>}
        commands={commands}
      />
    </div>
  )
}

export default Commands;
