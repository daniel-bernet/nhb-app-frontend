import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
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
  private pollOptions = new BehaviorSubject<any[]>([]);

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

  async getGroups(): Promise<Observable<any[]>> {
    await this.refreshGroups();
    return this.groups.asObservable();
  }

  getGroup(groupId: string): Observable<any> {
    return this.groups.pipe(
      map((groups) => groups.find((g) => g.GroupID === groupId)),
      switchMap((group) => {
        //if (group) {
        return of(group);
        //}
        //else { throws error when group is deleted for api call for inexistent groupId
        //  return this.apiService.getGroup(groupId).pipe(
        //    tap((fetchedGroup) => {
        //      const currentGroups = this.groups.getValue();
        //      this.groups.next([...currentGroups, fetchedGroup]);
        //    })
        //  );
        //}
      })
    );
  }

  async refreshGroups() {
    this.apiService.getBasicGroupInformation().subscribe({
      next: (data) => this.groups.next(data.groups),
      error: (error) =>
        console.error('Failed to fetch group information', error),
    });
  }

  createGroup(name: string, description: string, accountIds: string[]) {
    return this.apiService.createGroup(name, description, accountIds).pipe(
      tap((response) => {
        if (response) {
          this.refreshGroups();
        }
      })
    );
  }

  getGroupFeed(groupId: string): Observable<any[]> {
    if (!this.groupFeeds.has(groupId)) {
      this.groupFeeds.set(groupId, new BehaviorSubject<any[]>([]));
    }

    const feed = this.groupFeeds.get(groupId);

    this.apiService.getGroupFeed(groupId).subscribe({
      next: (data) => {
        console.log('fetched group feed delivered from API: ', data);
        const updatedFeed = data.data;
        feed!.next(updatedFeed);
      },
      error: (error) =>
        console.error(`Failed to fetch feed for group ${groupId}`, error),
    });

    return feed!.asObservable();
  }

  getFeedEntry(feedId: string, groupId: string): Observable<any> {
    if (!this.groupFeeds.has(groupId)) {
      this.getGroupFeed(groupId);
    }

    return this.groupFeeds.get(groupId)!.pipe(
      map((feed) => {
        const entry = feed.find(
          (entry) => entry.EventID === feedId || entry.PollID === feedId
        );
        if (!entry) {
          return throwError(() => new Error('Feed entry not found'));
        }
        return entry;
      }),
      catchError((error) => {
        console.error('Error accessing feed entry:', error);
        return throwError(() => error);
      })
    );
  }

  getQuestion(
    groupId: string,
    pollId: string,
    questionId: string
  ): Observable<any> {
    return this.getFeedEntry(pollId, groupId).pipe(
      switchMap((poll) => {
        const question = poll.questions.find(
          (q: any) => q.QuestionID === questionId
        );
        if (!question) {
          return throwError(() => new Error('Question not found'));
        }
        return of(question);
      }),
      catchError((error) => {
        console.error('Error fetching question:', error);
        return throwError(() => error);
      })
    );
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
            this.getGroupFeed(groupID);
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
            this.getGroupFeed(groupID);
          }
        })
      );
  }

  fetchPollOptions() {
    this.apiService.getPollOptions().subscribe({
      next: (data) => {
        this.pollOptions.next(data.data);
      },
      error: (error) => {
        console.error('Failed to fetch poll options', error);
      },
    });
  }

  getPollOptions(): Observable<any[]> {
    if (this.pollOptions.getValue().length === 0) {
      this.fetchPollOptions();
    }
    return this.pollOptions.asObservable();
  }

  deleteEvent(eventId: string): Observable<any> {
    return this.apiService.deleteEvent(eventId).pipe(
      tap({
        next: (response) => console.log(response.message),
        error: (error) => console.error('Error deleting event:', error.message),
      })
    );
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
    return this.apiService.editEvent(eventId, eventData).pipe(
      tap({
        next: (response) => console.log(response.message),
        error: (error) => console.error('Error updating event:', error.message),
      })
    );
  }

  searchAccounts(searchText: string): Observable<any[]> {
    return this.apiService.searchAccounts(searchText);
  }

  openPoll(pollId: string, groupId: string): Observable<any> {
    return this.apiService.openPoll(pollId).pipe(
      tap({
        next: () => this.getGroupFeed(groupId),
        error: (error) => console.error('Error opening poll', error),
      })
    );
  }

  closePoll(pollId: string, groupId: string): Observable<any> {
    return this.apiService.closePoll(pollId).pipe(
      tap({
        next: () => this.getGroupFeed(groupId),
        error: (error) => console.error('Error closing poll', error),
      })
    );
  }

  submitAnswers(pollId: string, answers: any[]): Observable<any> {
    return this.apiService.submitAnswers(pollId, answers).pipe(
      tap({
        next: (response) => {
          this.refreshGroups();
        },
        error: (error) => {
          console.error('Failed to submit answers:', error);
        },
      })
    );
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.apiService.deleteGroup(groupId).pipe(
      tap({
        next: () => {
          this.refreshGroups();
        },
        error: (error) => {
          console.error('Error deleting group:', error);
        },
      })
    );
  }

  addMemberToGroup(groupId: string, accountId: string): Observable<any> {
    return this.apiService.addMemberToGroup(groupId, accountId).pipe(
      tap({
        next: () => {
          this.refreshGroups();
        },
        error: (error) => {
          console.error('Error adding member to group:', error);
        },
      })
    );
  }

  removeMemberFromGroup(groupId: string, accountId: string): Observable<any> {
    return this.apiService.removeMemberFromGroup(groupId, accountId).pipe(
      tap({
        next: () => {
          this.refreshGroups();
        },
        error: (error) => {
          console.error('Error removing member from group:', error);
        },
      })
    );
  }

  deletePoll(pollId: string, groupId: string): Observable<any> {
    return this.apiService.deletePoll(pollId).pipe(
      tap({
        next: (response) => this.getGroupFeed(groupId),
        error: (error) => console.error('Failed to delete poll:', error),
      })
    );
  }

  editPoll(
    pollId: string,
    title: string,
    description: string,
    groupId: string
  ): Observable<any> {
    return this.apiService.editPoll(pollId, { title, description }).pipe(
      tap({
        next: (response) => this.getGroupFeed(groupId),
        error: (error) => console.error('Failed to update poll:', error),
      })
    );
  }
}
