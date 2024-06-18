import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  private createAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getJWT()}`,
    });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const url = `${this.api_domain}/account/change-password`;
    const body = { oldPassword, newPassword };
    const headers = this.createAuthHeaders();

    return this.httpClient.post<any>(url, body, { headers });
  }

  changeEmail(newEmail: string): Observable<any> {
    const url = `${this.api_domain}/account/change-email`;
    const body = { newEmail };
    const headers = this.createAuthHeaders();

    return this.httpClient.post<any>(url, body, { headers });
  }

  changeFirstName(newFirstName: string): Observable<any> {
    const url = `${this.api_domain}/account/change-first-name`;
    const body = { firstName: newFirstName };
    const headers = this.createAuthHeaders();

    return this.httpClient.patch<any>(url, body, { headers });
  }

  changeLastName(newLastName: string): Observable<any> {
    const url = `${this.api_domain}/account/change-last-name`;
    const body = { lastName: newLastName };
    const headers = this.createAuthHeaders();

    return this.httpClient.patch<any>(url, body, { headers });
  }

  logOut(): Observable<any> {
    console.log('no logout implementation present');
    this.authService.voidJWT();
    return new Observable();
  }

  deleteAccount(): Observable<any> {
    const url = `${this.api_domain}/account/delete-account`;
    const headers = this.createAuthHeaders();

    return this.httpClient.delete<any>(url, { headers });
  }

  getAccountInfo(): Observable<any> {
    const url = `${this.api_domain}/account/account-info`;
    const headers = this.createAuthHeaders();
    return this.httpClient.get<any>(url, { headers });
  }

  getSentiments(): Observable<any[]> {
    const url = `${this.api_domain}/sentiment/get-sentiments`;
    const headers = this.createAuthHeaders();
    return this.httpClient.get<any[]>(url, { headers });
  }

  getTypes(): Observable<any[]> {
    const url = `${this.api_domain}/type/get-types`;
    const headers = this.createAuthHeaders();
    return this.httpClient.get<any[]>(url, { headers });
  }

  getBasicGroupInformation(): Observable<any> {
    const url = `${this.api_domain}/account/get-basic-group-information`;
    const headers = this.createAuthHeaders();

    return this.httpClient.get<any>(url, { headers });
  }

  createGroup(
    name: string,
    description: string,
    accountIds: string[]
  ): Observable<any> {
    const url = `${this.api_domain}/group/create`;
    const headers = this.createAuthHeaders();
    const body = { name, description, accountIds };

    return this.httpClient.post<any>(url, body, { headers });
  }

  getGroupFeed(groupId: string, start: number = 0): Observable<any> {
    const url = `${this.api_domain}/group/get-feed/${groupId}?start=${start}`;
    const headers = this.createAuthHeaders();

    return this.httpClient.get<any>(url, { headers });
  }

  createPoll(
    groupID: string,
    typeID: string,
    title: string,
    description: string,
    questions: any[]
  ): Observable<any> {
    const url = `${this.api_domain}/poll/create-poll`;
    const body = { groupID, typeID, title, description, questions };
    const headers = this.createAuthHeaders();

    return this.httpClient.post<any>(url, body, { headers });
  }

  createEvent(
    groupID: string,
    typeID: string,
    title: string,
    description: string,
    location: string,
    date: Date,
    duration: number
  ): Observable<any> {
    const url = `${this.api_domain}/event/create`;
    const body = {
      GroupID: groupID,
      TypeID: typeID,
      Title: title,
      Description: description,
      Location: location,
      Date: date,
      Duration: duration,
    };
    const headers = this.createAuthHeaders();

    return this.httpClient.post<any>(url, body, { headers });
  }

  getPollOptions(): Observable<any> {
    const url = `${this.api_domain}/poll/get-options`;
    const headers = this.createAuthHeaders();

    return this.httpClient.get<any>(url, { headers });
  }

  deleteEvent(eventId: string): Observable<any> {
    const url = `${this.api_domain}/event/delete/${eventId}`;
    const headers = this.createAuthHeaders();

    return this.httpClient.delete<any>(url, { headers });
  }

  editEvent(
    eventId: string,
    eventData: {
      Title: string;
      Description: string;
      Location: string;
      Date: Date;
      Duration: number;
    }
  ): Observable<any> {
    const url = `${this.api_domain}/event/edit/${eventId}`;
    const headers = this.createAuthHeaders();
    const body = eventData;

    return this.httpClient.patch<any>(url, body, { headers });
  }

  searchAccounts(searchText: string): Observable<any[]> {
    const url = `${this.api_domain}/account/search-account`;
    const headers = this.createAuthHeaders();
    const params = new HttpParams().set('searchText', searchText);

    return this.httpClient.get<any[]>(url, { headers, params });
  }

  openPoll(pollId: string): Observable<any> {
    const url = `${this.api_domain}/poll/open/${pollId}`;
    const headers = this.createAuthHeaders();

    return this.httpClient.patch<any>(url, {}, { headers });
  }

  closePoll(pollId: string): Observable<any> {
    const url = `${this.api_domain}/poll/close/${pollId}`;
    const headers = this.createAuthHeaders();

    return this.httpClient.patch<any>(url, {}, { headers });
  }

  submitAnswers(pollId: string, answers: any[]): Observable<any> {
    const url = `${this.api_domain}/answer/submit-answer`;
    const headers = this.createAuthHeaders();
    const body = { pollId, answers };

    return this.httpClient.post<any>(url, body, { headers });
  }

  deleteGroup(groupId: string): Observable<any> {
    const url = `${this.api_domain}/group/delete/${groupId}`;
    const headers = this.createAuthHeaders();
    return this.httpClient.delete<any>(url, { headers });
  }

  addMemberToGroup(groupId: string, accountId: string): Observable<any> {
    const url = `${this.api_domain}/group/add-member`;
    const body = { groupId, manipulateAccountId: accountId };
    const headers = this.createAuthHeaders();
    return this.httpClient.post<any>(url, body, { headers });
  }

  removeMemberFromGroup(groupId: string, accountId: string): Observable<any> {
    const url = `${this.api_domain}/group/remove-member`;
    const body = { groupId, manipulateAccountId: accountId };
    const headers = this.createAuthHeaders();
    return this.httpClient.request<any>('delete', url, { headers, body });
  }
}
