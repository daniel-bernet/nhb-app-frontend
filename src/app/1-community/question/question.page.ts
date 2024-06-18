import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonIcon,
  IonText,
  IonFab,
  IonFabButton,
  IonFabList,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormatService } from 'src/app/services/format.service';
import {
  alertCircleOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  helpCircleOutline,
  informationCircleOutline,
  timeOutline,
  todayOutline,
} from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
  standalone: true,
  imports: [
    IonFabList,
    IonFabButton,
    IonFab,
    IonText,
    IonIcon,
    IonItem,
    IonLabel,
    IonItemDivider,
    IonItemGroup,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class QuestionPage implements OnInit {
  groupId?: string;
  questionId?: string;
  pollId?: string;
  question$?: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    protected formatService: FormatService
  ) {
    addIcons({
      todayOutline,
      timeOutline,
      informationCircleOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      alertCircleOutline,
      helpCircleOutline,
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.groupId =
          this.router.getCurrentNavigation()?.extras.state?.['groupId'];
        this.questionId =
          this.router.getCurrentNavigation()?.extras.state?.['questionId'];
        this.pollId =
          this.router.getCurrentNavigation()?.extras.state?.['pollId'];
        this.question$ = this.dataService.getQuestion(
          this.groupId!,
          this.pollId!,
          this.questionId!
        );
      }
    });
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
