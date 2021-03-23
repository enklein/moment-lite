import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Task } from "./task.model";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({providedIn: 'root'})
export class TaskService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getTasks(): Observable<any> {
    return this.http.get<Task>(
      'http://localhost:8080/api/task'
    );
  }

  getTask(id: string): Observable<any> {
    return this.http.get<Task>(
      'http://localhost:8080/api/task/:id'
    );
  }

  // create task

  // update task true/false
  checkTask(task_uuid: string, task_status: boolean): Observable<any> {
    let taskUrl = `http://localhost:8080/api/task/${task_uuid}`
    return this.http.put<Task>(
      taskUrl,
      {
        task_status: task_status
      }, httpOptions
    );
  }

  //update task

  // delete task
}