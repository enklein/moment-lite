import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface AuthResponseData {
  id: string,
  username: string,
  email: string,
  accessToken: string
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post<AuthResponseData>(
      'http://localhost:8080/api/auth/register',
      {
        username: username,
        email: email,
        password: password
      }, httpOptions
    );
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<AuthResponseData>(
      'http://localhost:8080/api/auth/login',
      {
        username: username,
        password: password
      }, httpOptions
    );
  }
}