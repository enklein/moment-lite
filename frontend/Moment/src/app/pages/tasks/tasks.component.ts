import { Component, OnInit } from '@angular/core';
import { TaskService } from './tasks.service';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  taskStatus = null;
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      resData => {
        this.tasks = resData;
      },
      error => {
        console.log(error);
      }
    );
    console.log();
  }
}
