import { ITask } from "../components/Task";
import { useAsanaToken } from "./auth";
import { forEach } from "lodash";
import { createClient } from "../lib/asana";
import { useEffect, useState } from "react";

export interface IUseAsanaTasksResult {
  loading: boolean
  createTask: (task: ITask) => Promise<void>
  sync: () => Promise<void>
  workspace?: string
  error?: Error
  tasks: ITask[]
}

const asanaTasks: ITask[] = []

const mapTaskToAsanaTask = ({ description, complete }: ITask) => ({
  name: description,
  completed: complete,
})

const mapAsanaTaskToTask = ({ name, completed }: any): ITask => ({
  description: name,
  complete: completed
})

export const useAsanaTasks = () => {
  const [token] = useAsanaToken(null);
  const [state, setState] = useState<IUseAsanaTasksResult>({
    createTask: async (task: ITask) => {
      // TODO persist it
      asanaTasks.push(task)
      setState({
        ...state,
        tasks: [...asanaTasks]
      })
    },
    sync: async () => {
      console.log('Syncing Asana Tasks!')
      if (token) {
        state.loading = true
        setState({
          ...state,
          loading: true
        })
        try {
          const client = createClient(token!)
          const user = await client.users.me()

          const userId = user.gid;
          // The user's "default" workspace is the first one in the list, though
          // any user can have multiple workspaces so you can't always assume this
          // is the one you want to work with.
          const workspaceId = user.workspaces[0].gid;

          asanaTasks.length = 0

          forEach((await client.tasks.findAll({
            assignee: parseInt(userId),
            workspace: parseInt(workspaceId),
            completed_since: 'now',
            opt_fields: 'id,name,assignee_status,completed'
          })).data, (asanaTask) => {
            console.log('Processing...', asanaTask)
            asanaTasks.push(mapAsanaTaskToTask(asanaTask))
          })

          setState({
            ...state,
            workspace: user.workspaces[0].name,
            tasks: [...asanaTasks],
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

      console.log(state)
    },
    loading: false,
    tasks: asanaTasks,
  })

  useEffect(() => {
    state.sync()
  }, [token])

  return state
}
