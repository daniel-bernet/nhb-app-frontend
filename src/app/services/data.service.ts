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
  private groupFeeds = new Map<string, BehaviorSubject<any[]>>();

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

  getGroupFeed(groupId: string, fetchMore = false): Observable<any[]> {
    if (!this.groupFeeds.has(groupId)) {
      this.groupFeeds.set(groupId, new BehaviorSubject<any[]>([]));
    }

    const feed = this.groupFeeds.get(groupId);

    if (feed!.getValue().length === 0 || fetchMore) {
      const start = fetchMore ? feed!.getValue().length : 0;
      this.apiService.getGroupFeed(groupId, start).subscribe({
        next: (data) => {
          console.log('fetched group feed delivered from API: ', data);
          const currentFeed = feed!.getValue();
          const updatedFeed = fetchMore
            ? [...currentFeed, ...data.data]
            : data.data;
          feed!.next(updatedFeed);
        },
        error: (error) =>
          console.error(`Failed to fetch feed for group ${groupId}`, error),
      });
    }

    return feed!.asObservable();
  }

  createPoll(
    groupID: string,
    typeID: string,
    title: string,
    description: string,
    questions: any[]
  ) {
    return this.apiService
      .createPoll(groupID, typeID, title, description, questions)
      .pipe(
        tap((response) => {
          if (response && response.poll) {
            // Assuming you might want to keep track of polls similarly to groups
            // This is just an example and might need adjustments based on actual app requirements
            this.updatePollsData(response.poll);
          }
        })
      );
  }

  createEvent(
    groupID: string,
    typeID: string,
    title: string,
    description: string,
    location: string,
    date: Date,
    duration: number
  ) {
    return this.apiService
      .createEvent(
        groupID,
        typeID,
        title,
        description,
        location,
        date,
        duration
      )
      .pipe(
        tap((response) => {
          if (response && response.event) {
            // Update local events data similarly
            this.updateEventsData(response.event);
          }
        })
      );
  }

  // Example methods to update local state
  private updatePollsData(poll: any) {
    // Implement actual logic to integrate new poll into local data state
  }

  private updateEventsData(event: any) {
    // Implement actual logic to integrate new event into local data state
  }
}
