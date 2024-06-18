import { Component, OnInit } from '@angular/core';
import { CommonModule, Location, AsyncPipe } from '@angular/common';
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
  AlertController,
} from '@ionic/angular/standalone';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { addIcons } from 'ionicons';
import {
  calendarOutline,
  ellipsisVerticalOutline,
  personAddOutline,
  personRemoveOutline,
  statsChartOutline,
  trashOutline,
} from 'ionicons/icons';
import { FormatService } from 'src/app/services/format.service';
import { Observable, firstValueFrom } from 'rxjs';

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
    AsyncPipe,
  ],
})
export class GroupPage implements OnInit {
  groupId?: string;
  group$?: Observable<any>;
  feedItems$?: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    protected formatService: FormatService,
    private alertController: AlertController,
    private location: Location
  ) {
    addIcons({
      ellipsisVerticalOutline,
      calendarOutline,
      statsChartOutline,
      trashOutline,
      personAddOutline,
      personRemoveOutline,
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.groupId =
          this.router.getCurrentNavigation()?.extras.state?.['groupId'];
        this.group$ = this.dataService.getGroup(this.groupId!);
        this.feedItems$ = this.dataService.getGroupFeed(this.groupId!);
      }
    });
  }

  openPoll(pollId: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        pollId: pollId,
        groupId: this.groupId,
      },
    };
    this.router.navigate(
      ['tabs', 'community', 'group', 'poll'],
      navigationExtras
    );
  }

  openEvent(eventId: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        eventId: eventId,
        groupId: this.groupId,
      },
    };
    this.router.navigate(
      ['tabs', 'community', 'group', 'event'],
      navigationExtras
    );
  }

  createPoll() {
    let navigationExtras: NavigationExtras = {
      state: {
        groupId: this.groupId,
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
        groupId: this.groupId,
      },
    };
    this.router.navigate(
      ['tabs', 'community', 'group', 'create-event'],
      navigationExtras
    );
  }

  answerOverview(questions: any[]): string {
    var answerCount = 0;
    const memberCount = questions[0].answers.length;
    for (let i = 0; i < memberCount; i++) {
      var answeredAllQuestions = true;
      questions.forEach(function (question) {
        if (question.answers[i].option.sentiment.Sentiment === 'u') {
          answeredAllQuestions = false;
          return;
        }
      });
      answerCount += answeredAllQuestions ? 1 : 0;
    }
    return answerCount + ' of ' + memberCount + ' answered';
  }

  async deleteGroup() {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message:
        'Do you really want to delete this group and all its related data?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.dataService.deleteGroup(this.groupId!).subscribe({
              next: (_) => {
                this.location.back();
              },
              error: (err) => console.error('Failed to delete group', err),
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async addGroupMember() {
    const searchAlert = await this.alertController.create({
      header: 'Search for Group Members',
      inputs: [
        {
          name: 'searchText',
          type: 'text',
          placeholder: 'Enter name or email',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Search',
          handler: (data) => {
            const searchText = data.searchText.trim();
            if (searchText) {
              this.dataService.searchAccounts(searchText).subscribe({
                next: (accounts) => this.showAccountsList(accounts),
                error: () => {
                  console.log('Failed to search accounts');
                },
              });
            }
          },
        },
      ],
    });

    await searchAlert.present();
  }

  async showAccountsList(accounts: any[]) {
    const selectAlert = await this.alertController.create({
      header: 'Select an Account',
      inputs: accounts.map((account) => ({
        name: 'accounts',
        type: 'radio',
        label: `${account.FirstName} ${account.LastName} - ${account.Email}`,
        value: account.AccountID,
      })),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (accountId) => {
            this.dataService
              .addMemberToGroup(this.groupId!, accountId)
              .subscribe({
                next: () => console.log('Member added successfully'),
                error: (error) => console.error('Error adding member:', error),
              });
          },
        },
      ],
    });

    await selectAlert.present();
  }

  async removeGroupMember() {
    const group = await firstValueFrom(this.group$!.pipe());
    const memberAlert = await this.alertController.create({
      header: 'Remove Group Members',
      inputs: group.members.map((member: any) => ({
        name: 'selectedMembers',
        type: 'checkbox',
        label: `${member.FirstName} ${member.LastName}`,
        value: member.AccountID,
      })),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Remove',
          handler: (selectedAccountIds) => {
            selectedAccountIds.forEach((accountId: any) => {
              this.dataService
                .removeMemberFromGroup(this.groupId!, accountId)
                .subscribe({
                  next: () => {
                    console.log('Member removed successfully');
                    this.group$ = this.dataService.getGroup(this.groupId!);
                  },
                  error: (error) =>
                    console.error('Error removing member:', error),
                });
            });
          },
        },
      ],
    });

    await memberAlert.present();
  }
}
