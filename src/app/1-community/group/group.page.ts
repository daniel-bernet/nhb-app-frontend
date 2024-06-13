import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonText,
  IonLoading,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScrollContent,
    IonInfiniteScroll,
    IonLoading,
    IonText,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class GroupPage implements OnInit {
  group?: any;
  feedItems: any[] = [];
  feedIndex?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.group =
          this.router.getCurrentNavigation()?.extras.state?.['group'];
        this.loadFeed();
      }
    });
  }

  loadFeed(fetchMore: boolean = false) {
    this.dataService.getGroupFeed(this.group.groupID, fetchMore).subscribe({
      next: (data) =>
        (this.feedItems = fetchMore ? [...this.feedItems, ...data] : data),
      error: (error) => console.error('Failed to load group feed', error),
    });
  }

  loadMore(event: any) {
    this.loadFeed(true);
    event.target.complete();
  }

  openPoll(arg0: any) {
    throw new Error('Method not implemented.');
  }
  openEvent(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
