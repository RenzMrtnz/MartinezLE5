import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7263/api/Login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post(
      `${this.apiUrl}/login`,
      {
        userName: username,
        password: password
      },
      { responseType: 'text' }
    );
  }

  register(user: {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
  }) {
    return this.http.post(
      `${this.apiUrl}/register`,
      user,
      { responseType: 'text' }
    );
  }
}
