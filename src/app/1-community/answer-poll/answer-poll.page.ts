import { Component, OnInit } from '@angular/core';
import { CommonModule, Location, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonLabel,
  IonItem,
  IonText,
  IonTabButton,
  IonButton,
  IonSelect,
  IonSelectOption,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormatService } from 'src/app/services/format.service';
import {
  checkboxOutline,
  helpCircleOutline,
  informationCircleOutline,
  pricetagOutline,
  timeOutline,
  todayOutline,
} from 'ionicons/icons';
import { Observable, firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-answer-poll',
  templateUrl: './answer-poll.page.html',
  styleUrls: ['./answer-poll.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonTabButton,
    IonText,
    IonItem,
    IonLabel,
    IonItemDivider,
    IonItemGroup,
    IonList,
    IonIcon,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSelectOption,
    AsyncPipe,
  ],
})
export class AnswerPollPage implements OnInit {
  groupId?: string;
  pollId?: string;
  poll$?: Observable<any>;
  answers: Map<string, string> = new Map(); // questionID, optionID

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    protected formatService: FormatService,
    private alertController: AlertController,
    private location: Location
  ) {
    addIcons({
      pricetagOutline,
      informationCircleOutline,
      helpCircleOutline,
      todayOutline,
      timeOutline,
      checkboxOutline,
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.groupId =
          this.router.getCurrentNavigation()?.extras.state?.['groupId'];
        this.pollId =
          this.router.getCurrentNavigation()?.extras.state?.['pollId'];
        this.poll$ = this.dataService.getFeedEntry(this.pollId!, this.groupId!);
      }
    });
  }

  selectAnswer(questionId: string, optionId: string) {
    this.answers.set(questionId, optionId);
  }

  async submitAnswer() {
    const poll = await firstValueFrom(this.poll$!.pipe());

    if (this.answers.size !== poll.questions.length) {
      const alert = await this.alertController.create({
        header: 'Incomplete Answers',
        message: 'Please answer all questions before submitting.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const answersArray = Array.from(this.answers).map(
      ([questionId, optionId]) => ({
        questionId,
        optionId,
      })
    );

    this.dataService.submitAnswers(poll.PollID, answersArray).subscribe({
      next: () => {
        this.location.back();
      },
      error: async (err) => {
        const alert = await this.alertController.create({
          header: 'Submission Failed',
          message: 'Failed to submit your answers. Please try again later.',
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }
}
