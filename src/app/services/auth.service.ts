import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  private api_domain: string = 'http://localhost:9001';
  private jwt_token?: string;

  login(email: string, password: string): Observable<any> {
    const url = `${this.api_domain}/account/login`;
    const body = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post<any>(url, body, { headers }).pipe(
      tap((response) => {
        if (response && response.token) {
          this.jwt_token = response.token;
        }
      })
    );
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> {
    const url = `${this.api_domain}/account/create-account`;
    const body = { firstName, lastName, email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post<any>(url, body, { headers }).pipe(
      tap((response) => {
        if (response && response.token) {
          this.jwt_token = response.token;
        }
      })
    );
  }

  getJWT() {
    console.log('the jwt token is:', this.jwt_token);
    return this.jwt_token;
  }

  voidJWT() {
    this.jwt_token = undefined;
  }
}
