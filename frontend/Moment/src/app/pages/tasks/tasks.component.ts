import { Component, OnInit } from '@angular/core';
import { TaskService } from './tasks.service';
import { Task } from './task.model';
import { AppSession } from './sessions-array.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  task: Task;
  app_sessions: AppSession[];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      resData => {
        this.tasks = resData;
        this.tasks.forEach(task => {
          task.total_session_count = task.app_sessions.length;

          if (task.app_sessions.length > 0) {
            task.total_session_time = this.calculateTaskTime(task.app_sessions);
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  calculateTaskTime(sessions: AppSession[]) {
    let sum = 0;
    sessions.forEach((session:AppSession) => {
      sum = sum + (new Date(session.session_end).getTime() - new Date(session.session_start).getTime())
    })
    return sum;
  }

  changeStatus(task) {
    this.taskService.checkTask(task.task_uuid, task.task_status).subscribe(
      resData => {
        console.log(resData)
      },
      error => {
        console.log(error);
      }
    );
  }
}
