import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Preferences } from '@capacitor/preferences';

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
          this.setJWT(response.token);
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
          this.setJWT(response.token);
        }
      })
    );
  }

  getJWT() {
    return this.jwt_token;
  }

  async voidJWT() {
    this.jwt_token = undefined;
    await Preferences.remove({ key: 'jwt' });
  }

  authenticateJWT(): Observable<any> {
    if (!this.jwt_token) {
      return of({ error: 'No token found', isAuthenticated: false });
    }

    const url = `${this.api_domain}/account/authenticate`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.jwt_token}`,
    });

    return this.httpClient.get<any>(url, { headers }).pipe(
      map((response) => ({
        isAuthenticated: true,
        account: response.account,
      })),
      catchError((error) => {
        console.error('JWT validation failed', error);
        return of({ isAuthenticated: false, error: 'JWT validation failed' });
      })
    );
  }

  async checkForJWT(): Promise<boolean> {
    const jwt = await (await Preferences.get({ key: 'jwt' })).value;
    if (jwt) {
      this.jwt_token = jwt;
      return firstValueFrom(
        this.authenticateJWT().pipe(
          map(async (result) => {
            if (result.isAuthenticated) {
              await this.setJWT(jwt);
              return true;
            } else {
              this.voidJWT();
              return false;
            }
          })
        )
      );
    } else {
      return false;
    }
  }

  async setJWT(jwt: string) {
    this.jwt_token = jwt;
    await Preferences.set({
      key: 'jwt',
      value: jwt,
    });
  }
}
