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

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({providedIn: 'root'})
export class AuthService {
  isLoggedIn = !!this.getToken();

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

  // Token Storage

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    console.log('getToken ran', window.sessionStorage.getItem(TOKEN_KEY))
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    console.log('getUser method ran')
    console.log(window.sessionStorage.getItem(USER_KEY))
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      console.log(JSON.parse(user));
      return JSON.parse(user);
    }

    return {};
  }
}