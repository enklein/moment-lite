import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
  id: string,
  username: string,
  email: string,
  accessToken: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(username: string, email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'http://localhost:8080/api/auth/register',
      {
        username: username,
        email: email,
        password: password
      }
    );
  }

  login(username: string, password: string) {
    return this.http.post<AuthResponseData>(
      'http://localhost:8080/api/auth/login',
      {
        username: username,
        password: password
      }
    );
  }
}