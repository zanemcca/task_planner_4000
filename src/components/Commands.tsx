
import React, { useState } from 'react';
import CommandPalette from 'react-command-palette';
import { Button, message } from 'antd';

import asanaLogo from '../asana_logo.png';
import sunsamaLogo from '../sunsama_logo.png';
import '../styles/Commands.css';
import AsanaTaskCreateForm from './forms/AsanaTaskCreate';
import { createClient } from '../lib/asana';
import { useCreateAsanaTask, useAsanaCredentials } from '../hooks/asana';

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
  const [loading, setLoading] = useState(false)
  const [isAsanaTaskFormVisible, setIsAsanaTaskFormVisible] = useState(false);
  const [asanaFormRef, setAsanaFormRef] = useState()
  const [credentials] = useAsanaCredentials();
  const { createTask } = useCreateAsanaTask();

  const isAsanaAuthorized = !!credentials.access_token
  const commands = [{
    name: 'Create Task',
    icon: sunsamaLogo,
    command: () => message.success('Creating a task is coming soon')
  }, {
    name: isAsanaAuthorized ? 'Create Asana Task' : 'Connect to Asana',
    icon: asanaLogo,
    command: () => {
      if (!isAsanaAuthorized) {
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
    setLoading(true)
    const { form } = asanaFormRef.props;
    form.validateFields(async (err: Error | null, values: any) => {
      if (err) {
        message.error(err.message)
        setLoading(false)
        return;
      }

      await createTask({
        description: values.title
      })
      form.resetFields();
      setLoading(false)
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
        loading={loading}
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
