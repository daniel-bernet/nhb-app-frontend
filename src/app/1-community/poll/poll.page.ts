import { Component, OnInit } from '@angular/core';
import { CommonModule, Location, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  AlertController,
  IonIcon,
  IonFab,
  IonFabButton,
  IonFabList,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonText,
  IonProgressBar,
} from '@ionic/angular/standalone';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormatService } from 'src/app/services/format.service';
import { addIcons } from 'ionicons';
import {
  buildOutline,
  checkboxOutline,
  ellipsisVerticalOutline,
  informationCircleOutline,
  lockClosedOutline,
  lockOpenOutline,
  peopleOutline,
  pricetagOutline,
  trashOutline,
} from 'ionicons/icons';
import { ResponseIndicatorComponent } from 'src/app/components/response-indicator/response-indicator.component';
import { Observable, first, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.page.html',
  styleUrls: ['./poll.page.scss'],
  standalone: true,
  imports: [
    IonProgressBar,
    IonText,
    IonItem,
    IonLabel,
    IonItemDivider,
    IonItemGroup,
    IonList,
    IonFabList,
    IonFabButton,
    IonFab,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ResponseIndicatorComponent,
  ],
})
export class PollPage implements OnInit {
  groupId?: string;
  pollId?: string;
  group$?: Observable<any>;
  poll$?: Observable<any>;

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    protected formatService: FormatService,
    private location: Location
  ) {
    addIcons({
      lockClosedOutline,
      lockOpenOutline,
      pricetagOutline,
      informationCircleOutline,
      ellipsisVerticalOutline,
      buildOutline,
      trashOutline,
      checkboxOutline,
      peopleOutline,
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.groupId =
          this.router.getCurrentNavigation()?.extras.state?.['groupId'];
        this.pollId =
          this.router.getCurrentNavigation()?.extras.state?.['pollId'];
        this.group$ = this.dataService.getGroup(this.groupId!);
        this.poll$ = this.dataService.getFeedEntry(this.pollId!, this.groupId!);
      }
    });
  }

  async deletePoll() {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message:
        'Are you sure you want to delete this poll and all its related data?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.dataService.deletePoll(this.pollId!, this.groupId!).subscribe({
              next: () => {
                this.location.back();
              },
              error: (error) => console.error('Failed to delete poll:', error),
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async editPoll() {
    const poll = await firstValueFrom(this.poll$!.pipe());

    const alert = await this.alertController.create({
      header: 'Edit Poll',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Title',
          value: poll.Title,
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description',
          value: poll.Description,
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Save',
          handler: (data) => {
            this.dataService
              .editPoll(
                this.pollId!,
                data.title,
                data.description,
                this.groupId!
              )
              .subscribe({
                error: (error) =>
                  console.error('Failed to update poll:', error),
              });
          },
        },
      ],
    });

    await alert.present();
  }

  answerPoll() {
    let navigationExtras: NavigationExtras = {
      state: {
        pollId: this.pollId,
        groupId: this.groupId,
      },
    };
    this.router.navigate(
      ['tabs', 'community', 'group', 'poll', 'answer-poll'],
      navigationExtras
    );
  }

  async openClosePoll() {
    const poll = await firstValueFrom(this.poll$!.pipe());

    const operation = poll.IsClosed ? 'open' : 'close';

    const action =
      operation === 'open'
        ? this.dataService.openPoll
        : this.dataService.closePoll;

    action.call(this.dataService, this.pollId!, this.groupId!).subscribe({
      next: (response) => {
        console.log(`Poll ${operation}ed successfully:`, response);
      },
      error: (error) => {
        console.error(`Failed to ${operation} the poll:`, error);
      },
    });
  }

  openQuestion(questionId: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        questionId: questionId,
        groupId: this.groupId,
        pollId: this.pollId,
      },
    };
    this.router.navigate(
      ['tabs', 'community', 'group', 'poll', 'question'],
      navigationExtras
    );
  }

  calculateResponseCounts(question: any): Map<string, number> {
    var responseCounts: Map<string, number> = new Map();
    var positiveResponse: number = 0;
    var midResponse: number = 0;
    var negativeResponse: number = 0;
    var unansweredResponse: number = 0;

    question.answers.forEach((answer: any) => {
      switch (answer.option.sentiment.Sentiment) {
        case 'y': {
          positiveResponse += 1;
          break;
        }
        case 'n': {
          negativeResponse += 1;
          break;
        }
        case 'i': {
          midResponse += 1;
          break;
        }
        default: {
          unansweredResponse += 1;
          break;
        }
      }
    });

    responseCounts.set('positive', positiveResponse);
    responseCounts.set('mid', midResponse);
    responseCounts.set('negative', negativeResponse);
    responseCounts.set('unanswered', unansweredResponse);

    return responseCounts;
  }
}
