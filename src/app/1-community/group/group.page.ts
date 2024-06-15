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
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
  IonCardContent,
} from '@ionic/angular/standalone';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { addIcons } from 'ionicons';
import { add, calendarOutline, chatbubblesOutline } from 'ionicons/icons';

@Component({
  selector: 'app-group',
  templateUrl: './group.page.html',
  styleUrls: ['./group.page.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonFabList,
    IonIcon,
    IonFabButton,
    IonFab,
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
  ) {
    addIcons({
      add,
      calendarOutline,
      chatbubblesOutline,
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.group =
          this.router.getCurrentNavigation()?.extras.state?.['group'];
        this.loadFeed();
      }
      console.log(['feedItems: ', this.feedItems]);
    });
  }

  loadFeed(fetchMore: boolean = false) {
    if (this.group && this.group.GroupID) {
      this.dataService.getGroupFeed(this.group.GroupID, fetchMore).subscribe({
        next: (data) => {
          this.feedItems = fetchMore ? [...this.feedItems, ...data] : data;
          console.log('feedItems after fetch: ', this.feedItems);
        },
        error: (error) => console.error('Failed to load group feed', error),
      });
    }
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

  createPoll() {
    let navigationExtras: NavigationExtras = {
      state: {
        groupID: this.group.GroupID,
      },
    };
    this.router.navigate(
      ['tabs', 'community', 'group', 'create-poll'],
      navigationExtras
    );
  }
  createEvent() {
    let navigationExtras: NavigationExtras = {
      state: {
        groupID: this.group.GroupID,
      },
    };
    this.router.navigate(
      ['tabs', 'community', 'group', 'create-event'],
      navigationExtras
    );
  }

  formatDate(dateUnformatted: string): string {
    const date = new Date(dateUnformatted);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return date.toLocaleDateString();
  }
}
