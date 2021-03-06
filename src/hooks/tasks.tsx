
import { ITask } from '../components/Task';
import { createStateContext } from 'react-use';
import { useState, useCallback } from 'react';
import moment from 'moment';
import { useChannels } from './channels';

export interface IUseCreateTaskResult {
  loading: boolean
  createTask: (task: ITask) => Promise<void>
  error?: Error
  tasks: ITask[]
}

const today = moment().startOf('day')

const channels = useChannels()

export const [useTasks, TasksProvider] = createStateContext<ITask[]>([{
  date: today,
  created: moment(),
  description: 'Review PR for Task Planner 4000',
  channel: channels.default,
  time: moment.duration('01:00:00'),
}, {
  date: today,
  created: moment(),
  description: 'Review emails',
  complete: true,
}, {
  date: moment(today).add(1, 'd'),
  created: moment(),
  description: 'Write up weekly check in',
  channel: channels.default,
  time: moment.duration('00:30:00'),
}, {
  date: moment(today).add(1, 'd'),
  created: moment(),
  description: 'Deploy beta command palette.',
  channel: channels.personal,
}, {
  date: moment(today).add(2, 'd'),
  created: moment(),
  description: 'Set up CI for mobile project',
  complete: true,
  time: moment.duration('00:15:00'),
}, {
  date: moment(today).add(2, 'd'),
  created: moment(),
  description: 'Review new user reported issues',
  channel: channels.personal,
  time: moment.duration('00:30:00'),
}])

export const useCreateTask = () => {
  const [tasks, setTasks] = useTasks()
  const [loading, setLoading] = useState(false)

  const createTask = useCallback(async (task: ITask) => {
    setLoading(true)
    return new Promise((resolve) => {
      setTimeout(() => {
        const newTasks = [task, ...tasks]
        setTasks(newTasks)
        setLoading(false)
        resolve()
      }, 1500)
    })
  }, [tasks, setTasks])

  return {
    loading,
    createTask,
    tasks
  }
}
