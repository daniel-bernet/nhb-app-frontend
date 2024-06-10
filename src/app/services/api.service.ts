import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private api_domain: string = 'http://localhost:9001';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const url = `${this.api_domain}/account/change-password`;
    const body = { oldPassword, newPassword };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.httpClient.post<any>(url, body, { headers });
  }

  changeEmail(newEmail: string): Observable<any> {
    const url = `${this.api_domain}/account/change-email`;
    const body = { newEmail };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJWT()}`,
    });

    return this.httpClient.post<any>(url, body, { headers });
  }

  changeFirstName(newFirstName: string): Observable<any> {
    const url = `${this.api_domain}/account/change-first-name`;
    const body = { firstName: newFirstName };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJWT()}`,
    });

    return this.httpClient.patch<any>(url, body, { headers });
  }

  changeLastName(newLastName: string): Observable<any> {
    const url = `${this.api_domain}/account/change-last-name`;
    const body = { lastName: newLastName };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJWT()}`,
    });

    return this.httpClient.patch<any>(url, body, { headers });
  }

  logOut(): Observable<any> {
    // remove jwt from storage
    // navigate to the login page
    console.log('no logout implementation present');
    this.authService.voidJWT();
    return new Observable();
  }

  deleteAccount(): Observable<any> {
    // delete account
    console.log('no delete account implementation present');
    return new Observable();
  }
}
