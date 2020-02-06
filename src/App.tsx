import React from 'react';

import './App.css';

import Schedule from './components/Schedule';
import { Layout, Button } from 'antd';
import moment from 'moment';
import CommandPalette from 'react-command-palette';
import { IDailySchedule } from './components/DailySchedule';
import Asana from './components/Asana';

const { Sider, Content } = Layout

const channels = {
  default: {
    title: 'default',
    color: 'red'
  },
  personal: {
    title: 'personal',
    color: 'blue'
  }
}

const App = () => {
  const today = moment()
  const schedules: IDailySchedule[] = [{
    date: today,
    tasks: [{
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a sapien orci. Integer efficitur nunc sem, tristique lacinia lorem egestas at. Sed iaculis purus non nisl aliquet, tempor efficitur risus ornare. Aenean sapien lectus, varius quis lacus eget, facilisis ultricies leo.',
      channel: channels.default,
      time: moment.duration('01:00:00'),
    }, {
      description: 'Nam malesuada massa odio.',
      complete: true,
    }]
  }, {
    date: moment(today).add(1, 'd'),
    tasks: [{
      description: 'Aliquam vel massa accumsan, accumsan ex eu, posuere nunc.',
      channel: channels.default,
      time: moment.duration('00:30:00'),
    }, {
      description: 'Nam malesuada massa odio.',
      channel: channels.personal,
    }]
  }, {
    date: moment(today).add(2, 'd'),
    tasks: [{
      description: 'Vestibulum consequat dictum arcu sit amet pellentesque.',
      complete: true,
      time: moment.duration('00:15:00'),
    }, {
      description: 'Nullam magna leo, porttitor non semper quis, tempor quis leo.',
      channel: channels.personal,
      time: moment.duration('00:30:00'),
    }]
  }]

  const asana = {
    project: 'Backlog'
  }

  const commands = [{
    name: 'Create Asana Task',
    command: () => console.log('Create Asana Task')
  }, {
    name: 'Create Task',
    command: () => console.log('Create Task')
  }]

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

  return (
    <div className="App">
      <div style={{ position: 'absolute', bottom: '25px', left: '25px' }}>
        <CommandPalette theme={theme} trigger={<Button className="App-command-palette-button">Command Palette</Button>} commands={commands} />
      </div>
      <Layout className="App-layout">
        <Content className="App-content">
          <Schedule dailySchedules={schedules}/>
        </Content>
        <Sider theme="light" width='25%' className="App-sider">
          <Asana project={asana.project}/>
        </Sider>
      </Layout>
    </div>
  );
}

export default App;
