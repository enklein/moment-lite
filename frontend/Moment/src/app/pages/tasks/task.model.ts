import { AppSession } from "./sessions-array.model";

export interface Task {
  task_uuid: string,
  task_name: string,
  task_status: boolean,
  user_uuid?: string,
  app_sessions?: [AppSession],
  total_session_count?: number,
  total_session_time?: number
}