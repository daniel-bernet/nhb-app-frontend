import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonItem,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonSelectOption,
    IonSelect,
    IonInput,
  ],
})
export class CreateEventPage implements OnInit {
  groupID?: string;
  possibleTypes: any[] = [];
  errorMessage?: string;
  eventTitle?: string;
  eventDescription?: string;
  eventLocation?: string;
  eventDate?: Date;
  eventDuration?: number;
  selectedTypeID?: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.groupID =
          this.router.getCurrentNavigation()?.extras.state?.['groupId'];
      }
      this.fetchTypes();
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

  createEvent() {
    if (
      !this.eventTitle ||
      !this.eventDescription ||
      !this.eventLocation ||
      !this.eventDate ||
      !this.eventDuration ||
      !this.selectedTypeID
    ) {
      this.errorMessage = 'All fields must be filled out';
      return;
    }
    if (isNaN(this.eventDuration) || this.eventDuration < 0) {
      this.errorMessage = 'Duration must be a valid positive number';
      return;
    }

    console.log([
      'creating event with: ',
      this.groupID!,
      this.selectedTypeID!,
      this.eventTitle,
      this.eventDescription,
      this.eventLocation,
      this.eventDate,
      this.eventDuration,
    ]);

    this.dataService
      .createEvent(
        this.groupID!,
        this.selectedTypeID!,
        this.eventTitle,
        this.eventDescription,
        this.eventLocation,
        this.eventDate,
        this.eventDuration
      )
      .subscribe({
        next: (response) => {
          console.log('Event created successfully:', response);
          this.location.back();
        },
        error: (error) => {
          console.error('Failed to create event:', error);
          this.errorMessage = 'Failed to create event';
        },
      });
  }
}
