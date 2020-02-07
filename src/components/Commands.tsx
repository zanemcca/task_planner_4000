
import React from 'react';
import CommandPalette from 'react-command-palette';
import { Button, message } from 'antd';

import asanaLogo from '../asana_logo.png';
import sunsamaLogo from '../sunsama_logo.png';
import '../styles/Commands.css';

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

const commands = [{
  name: 'Create Task',
  icon: sunsamaLogo,
  command: () => message.success('Creating a task is coming soon')
}, {
  name: 'Create Asana Task',
  icon: asanaLogo,
  command: () => message.success('Creating an Asana task Coming Soon')
}]

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
  return (
    <div className="Commands-button-wrapper">
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
