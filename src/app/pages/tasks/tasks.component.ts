import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Task } from './task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  taskStatus = true;
  loadedTasks: Task[] = [];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTasks();
  }

  createTask(taskData: Task) {
    this.http
      .post<{ name: string }>(
        'https://moment-lite-default-rtdb.firebaseio.com/task.json',
        taskData
      ).subscribe(responseData => {
        console.log(responseData);
      });
  }

  private getTasks() {
    this.http
      .get<{ [key: string]: Task }>('https://moment-lite-default-rtdb.firebaseio.com/task.json')
      .pipe(
        map(responseData => {
          const tasksArray: Task[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              tasksArray.push({ ...responseData[key], id: key })
            }
          }
          return tasksArray;
        })
      )
      .subscribe(tasks => {
        this.loadedTasks = tasks;
      });
  }
}
