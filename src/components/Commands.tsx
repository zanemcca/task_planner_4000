
import React from 'react';
import CommandPalette from 'react-command-palette';
import { Button } from 'antd';
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
  command: () => console.log('Create Task')
}, {
  name: 'Create Asana Task',
  command: () => console.log('Create Asana Task')
}]

const Commands = () => {
  return (
    <div className="Commands-button-wrapper">
      <CommandPalette
        theme={theme}
        hotKeys='command+k'
        trigger={<Button>
          ⌘+k (Command Palette)
        </Button>}
        commands={commands}
      />
    </div>
  )
}

export default Commands;
