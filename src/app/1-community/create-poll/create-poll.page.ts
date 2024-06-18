import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormControl, FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonLabel,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonInput, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.page.html',
  styleUrls: ['./create-poll.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCardTitle, IonCardHeader, 
    IonButton,
    IonLabel,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelect,
    IonSelectOption,
    IonInput,
  ],
})
export class CreatePollPage implements OnInit {
  groupId?: string;
  possibleTypes: any[] = [];
  errorMessage?: string;
  pollOptions: any[] = [];
  questions: any[] = [
    {
      questionText: '',
      date: undefined,
      duration: undefined,
      description: '',
      options: [],
    },
  ];
  pollTitle?: string;
  pollDescription?: string;
  selectedTypeID?: string;
  ionSelect: FormControl = new FormControl([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private location : Location
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.groupId =
          this.router.getCurrentNavigation()?.extras.state?.['groupId'];
      }
      this.fetchTypes();
      this.fetchPollOptions();
    });
  }

  fetchTypes() {
    this.dataService.getTypes().subscribe({
      next: (types) => {
        this.possibleTypes = types;
      },
      error: (error) => {
        console.error('Failed to load types', error);
        this.errorMessage = 'Failed to load event types';
      },
    });
  }

  fetchPollOptions() {
    this.dataService.getPollOptions().subscribe({
      next: (options) => {
        this.pollOptions = options;
        this.questions.forEach((question) => {
          question.options = this.setDefaultAnswerOptions();
        });
      },
      error: (error) => {
        console.error('Failed to load poll options', error);
        this.errorMessage = 'Failed to load poll options';
      },
    });
  }

  setDefaultAnswerOptions() {
    const preSelectedOptions = this.pollOptions
      .filter((option) => option.Option.toLowerCase() !== 'unanswered')
      .map((option) => option.OptionID);
    return preSelectedOptions;
  }

  addQuestion() {
    this.questions.push({
      questionText: '',
      date: undefined,
      duration: undefined,
      description: '',
      options: this.setDefaultAnswerOptions(),
    });
  }

  removeQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.splice(index, 1);
    } else {
      this.errorMessage = 'At least one question is required.';
    }
  }

  createPoll() {
    if (
      !this.pollTitle ||
      !this.pollDescription ||
      this.questions.length === 0
    ) {
      this.errorMessage =
        'Please fill out all required fields and add at least one question.';
      return;
    }

    this.dataService
      .createPoll(
        this.groupId!,
        this.selectedTypeID!,
        this.pollTitle,
        this.pollDescription,
        this.questions
      )
      .subscribe({
        next: () => {
          console.log('Poll created successfully');
          this.location.back();
        },
        error: (error) => {
          console.error('Failed to create poll:', error);
          this.errorMessage = 'Failed to create the poll. Please try again.';
        },
      });
  }
}
