
import createPersistedState from 'use-persisted-state';
import { createStateContext, usePrevious } from 'react-use';
import { ITask } from "../components/Task";
import { map } from "lodash";
import { createClient } from "../lib/asana";
import { useEffect, useState } from "react";
import { message } from "antd";

export interface IUseAsanaTasksResult {
  loading: boolean
  sync: () => Promise<void>
  workspace?: string
  error?: Error
  tasks: ITask[]
}

export interface IUseCreateAsanaTaskResult {
  loading: boolean
  createTask: (task: ITask) => Promise<void>
  workspace?: string
  error?: Error
  tasks: ITask[]
}

const [useTasks, AsanaTasksProvider] = createStateContext<ITask[]>([]);

const mapTaskToAsanaTask = ({ description, complete }: ITask) => ({
  name: description,
  completed: complete,
})

const mapAsanaTaskToTask = ({ name, completed }: any): ITask => ({
  description: name,
  complete: completed
})

export const useAsanaTasks = () => {
  const [credentials] = useAsanaCredentials();
  const prevCredentials = usePrevious(credentials);
  const [tasks, setTasks] = useTasks()
  const prevTasks = usePrevious(tasks);
  console.log('useAsnaTask')
  console.log(tasks)
  const [state, setState] = useState<IUseAsanaTasksResult>({
    sync: async () => {
      console.log('Syncing Asana Tasks!')
      const token = credentials.access_token
      if (token) {
        state.loading = true
        setState({
          ...state,
          loading: true
        })
        try {
          const client = createClient(token, credentials.refresh_token)
          const user = await client.users.me()

          const userId = user.gid;
          // The user's "default" workspace is the first one in the list, though
          // any user can have multiple workspaces so you can't always assume this
          // is the one you want to work with.
          const workspaceId = user.workspaces[0].gid;

          const newTasks = map((await client.tasks.findAll({
            assignee: parseInt(userId),
            workspace: parseInt(workspaceId),
            completed_since: 'now',
            opt_fields: 'id,name,assignee_status,completed'
          })).data, mapAsanaTaskToTask)

          setTasks(newTasks)
          setState({
            ...state,
            workspace: user.workspaces[0].name,
            tasks: newTasks,
            loading: false
          })
        } catch(error) {
          setState({
            ...state,
            error,
            loading: false
          })
        }
      }
    },
    loading: false,
    tasks
  })

  useEffect(() => {
    if (prevCredentials !== credentials) {
      state.sync()
    }
  }, [credentials.access_token, state])

  useEffect(() => {
    if (prevTasks !== tasks) {
      setState({
        ...state,
        tasks
      })
    }
  }, [tasks, state])

  return state
}

export const useCreateAsanaTask = () => {
  const [credentials] = useAsanaCredentials();
  const [tasks, setTasks] = useTasks()
  const createTask = (tasks: ITask[]) => async (task: Pick<ITask, 'description'> & Partial<Omit<ITask, 'description'>>) => {
    console.log(tasks)
    const token = credentials.access_token
    if (!token) {
      message.error('Oops Looks like you are not logged into Asana. Please try again')
      return
    }
    const client = createClient(token!)

    const me = await client.users.me()
    const workspace = me.workspaces[0]

    const res = await client.tasks.create({
      assignee: me.gid,
      workspace: workspace.gid,
      ...mapTaskToAsanaTask(task)
    } as any)

    const newTasks = [...tasks, task]
    setTasks(newTasks)
    setState({
      ...state,
      createTask: createTask(tasks),
      tasks: newTasks
    })
  }

  const [state, setState] = useState<IUseCreateAsanaTaskResult>({
    createTask: createTask(tasks),
    loading: false,
    tasks
  })

  useEffect(() => {
    setState({
      ...state,
      createTask: createTask(tasks),
      tasks
    })
  }, [tasks])

  return state
}

export interface IAsanaCredentials {
  access_token?: string
  refresh_token?: string
}

const useAsanaCredentialsRaw = createPersistedState('asana_credentials');
export const useAsanaCredentials = () => useAsanaCredentialsRaw<IAsanaCredentials>({})

export default AsanaTasksProvider
