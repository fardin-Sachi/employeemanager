// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiServerUrl = 'http://localhost:8080';

  private authHeader: string | null = null;
  private isAdmin: boolean = false;
  private username: string | null = null

  constructor(private http: HttpClient) {}

  login(payload: {username: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiServerUrl}/auth/login`, payload)
  }
  
  setLoginState(username: string, password: string): void {
    this.username = username;
    this.isAdmin = true;
    this.authHeader = 'Basic ' + btoa(`${username}:${password}`);
  }

  logout(): void {
    this.authHeader = null;
    this.isAdmin = false;
    this.username = null
  }

  getAuthHeader(): string | null {
    return this.authHeader;
  }

  isLoggedIn(): boolean {
    return this.isAdmin;
  }

  getUsername(): string | null {
    return this.username;
  }
}
