import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private userInformation = new BehaviorSubject<any>(null);
  private sentiments = new BehaviorSubject<any[]>([]);
  private types = new BehaviorSubject<any[]>([]);
  private groups = new BehaviorSubject<any[]>([]);

  constructor(private apiService: ApiService) {}

  getUserInformation(): Observable<any> {
    if (!this.userInformation.getValue()) {
      this.fetchUserInformation();
    }
    return this.userInformation.asObservable();
  }

  getSentiments(): Observable<any[]> {
    if (this.sentiments.getValue().length === 0) {
      this.fetchSentiments();
    }
    return this.sentiments.asObservable();
  }

  getTypes(): Observable<any[]> {
    if (this.types.getValue().length === 0) {
      this.fetchTypes();
    }
    return this.types.asObservable();
  }

  refreshUserInformation() {
    this.fetchUserInformation();
  }

  private fetchUserInformation() {
    this.apiService.getAccountInfo().subscribe({
      next: (data) => this.userInformation.next(data),
      error: (error) =>
        console.error('Failed to fetch user information', error),
    });
  }

  private fetchSentiments() {
    this.apiService.getSentiments().subscribe({
      next: (data) => this.sentiments.next(data),
      error: (error) => console.error('Failed to fetch sentiments', error),
    });
  }

  private fetchTypes() {
    this.apiService.getTypes().subscribe({
      next: (data) => this.types.next(data),
      error: (error) => console.error('Failed to fetch types', error),
    });
  }

  getGroups(): Observable<any[]> {
    if (this.groups.getValue().length === 0) {
      this.refreshGroups();
    }
    return this.groups.asObservable();
  }

  refreshGroups() {
    this.apiService.getBasicGroupInformation().subscribe({
      next: (data) => this.groups.next(data.groups),
      error: (error) =>
        console.error('Failed to fetch group information', error),
    });
  }

  createGroup(name: string, description: string) {
    return this.apiService.createGroup(name, description).pipe(
      tap((response) => {
        if (response && response.group) {
          const updatedGroups = [...this.groups.getValue(), response.group];
          this.groups.next(updatedGroups);
        }
      })
    );
  }
}
