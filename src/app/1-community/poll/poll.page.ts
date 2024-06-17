import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  group?: any;
  poll?: any;

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    protected formatService: FormatService
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
        this.group =
          this.router.getCurrentNavigation()?.extras.state?.['group'];
        this.poll = this.router.getCurrentNavigation()?.extras.state?.['poll'];
      }
    });
  }

  deletePoll() {
    throw new Error('Method not implemented.');
  }

  editPoll() {
    throw new Error('Method not implemented.');
  }

  answerPoll() {
    let navigationExtras: NavigationExtras = {
      state: {
        poll: this.poll,
        group: this.group,
      },
    };
    this.router.navigate(
      ['tabs', 'community', 'group', 'poll', 'answer-poll'],
      navigationExtras
    );
  }

  openClosePoll() {
    if (this.poll) {
      const operation = this.poll.IsClosed ? 'open' : 'close';
      const action =
        operation === 'open'
          ? this.dataService.openPoll
          : this.dataService.closePoll;

      action.call(this.dataService, this.poll.PollID).subscribe({
        next: (response) => {
          console.log(`Poll ${operation}ed successfully:`, response);
          this.poll.IsClosed = !this.poll.IsClosed;
        },
        error: (error) => {
          console.error(`Failed to ${operation} the poll:`, error);
        },
      });
    } else {
      console.error('Poll data is not available.');
    }
  }

  openQuestion(question: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        question: question,
        group: this.group,
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
