
import createPersistedState from 'use-persisted-state';
import { createStateContext, usePrevious } from 'react-use';
import { ITask } from "../components/Task";
import { map } from "lodash";
import { createClient } from "../lib/asana";
import { useEffect, useState, useCallback } from "react";

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
  const [state, setState] = useState<Omit<IUseAsanaTasksResult, 'tasks'>>({
    sync: async () => {
      const token = credentials.access_token
      if (token) {
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
  })

  useEffect(() => {
    if (!prevCredentials || prevCredentials.access_token !== credentials.access_token) {
      state.sync()
    }
  }, [credentials.access_token, state, prevCredentials])

  return {
    ...state,
    tasks
  }
}

export const useCreateAsanaTask = () => {
  const [credentials] = useAsanaCredentials();
  const [tasks, setTasks] = useTasks()
  const [state, setState] = useState<Omit<IUseCreateAsanaTaskResult, 'createTask' | 'tasks'>>({
    loading: false
  })

  const createTask = useCallback(async (task: Partial<ITask>) => {
    setState({
      ...state,
      loading: true
    })

    try {
      const token = credentials.access_token
      if (!token) {
        throw new Error('Oops Looks like you are not logged into Asana. Please try again')
      }

      const client = createClient(token!)
      const me = await client.users.me()
      const workspace = me.workspaces[0]

      const newTask = await client.tasks.create({
        assignee: me.gid,
        workspace: workspace.gid,
        ...mapTaskToAsanaTask(task as ITask)
      } as any)

      const newTasks = [...tasks, mapAsanaTaskToTask(newTask)]
      setTasks(newTasks)

      setState({
        ...state,
        workspace: workspace.name,
        loading: false
      })
    } catch(error) {
      setState({
        ...state,
        loading: false,
        error
      })
    }
  }, [tasks, credentials.access_token, setTasks, state])

  return {
    ...state,
    createTask,
    tasks
  }
}

export interface IAsanaCredentials {
  access_token?: string
  refresh_token?: string
}

const useAsanaCredentialsRaw = createPersistedState('asana_credentials');
export const useAsanaCredentials = () => useAsanaCredentialsRaw<IAsanaCredentials>({})

export default AsanaTasksProvider
