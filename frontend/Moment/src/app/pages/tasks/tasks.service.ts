import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Task } from "./task.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': ''
  })
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

  // update task

  // delete task
}