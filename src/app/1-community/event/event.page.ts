import { Component, OnInit } from '@angular/core';
import { CommonModule, Location, AsyncPipe } from '@angular/common';
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
  IonNote,
  IonText,
  IonFab,
  IonFabButton,
  IonFabList,
  AlertController,
} from '@ionic/angular/standalone';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormatService } from 'src/app/services/format.service';
import { addIcons } from 'ionicons';
import {
  buildOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  ellipsisVerticalOutline,
  helpCircleOutline,
  informationCircleOutline,
  locationOutline,
  pricetagOutline,
  timeOutline,
  todayOutline,
  trashOutline,
} from 'ionicons/icons';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: true,
  imports: [
    IonFabList,
    IonFabButton,
    IonFab,
    IonText,
    IonNote,
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
    AsyncPipe,
  ],
})
export class EventPage implements OnInit {
  eventId?: string;
  groupId?: string;
  event$?: Observable<any>;

  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    protected formatService: FormatService,
    private location: Location
  ) {
    addIcons({
      locationOutline,
      todayOutline,
      timeOutline,
      informationCircleOutline,
      checkmarkCircleOutline,
      closeCircleOutline,
      helpCircleOutline,
      ellipsisVerticalOutline,
      buildOutline,
      trashOutline,
      pricetagOutline,
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        this.eventId =
          this.router.getCurrentNavigation()?.extras.state?.['eventId'];
        this.groupId =
          this.router.getCurrentNavigation()?.extras.state?.['groupId'];
        this.event$ = this.dataService.getFeedEntry(
          this.eventId!,
          this.groupId!
        );
      }
    });
  }

  async deleteEvent() {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message:
        'Are you sure you want to delete this event? All associated data will be lost.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes, Delete it',
          role: 'destructive',
          handler: () => {
            this.dataService.deleteEvent(this.eventId!).subscribe({
              next: () => {
                console.log('Event deleted successfully');
                this.location.back();
              },
              error: (error) => {
                console.error('Failed to delete the event:', error);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async editEvent() {
    this.event$!.subscribe(async (event: any) => {
      const alert = await this.alertController.create({
        header: 'Edit Event',
        inputs: [
          {
            name: 'title',
            type: 'text',
            placeholder: 'Event Title',
            value: event.Title,
          },
          {
            name: 'description',
            type: 'text',
            placeholder: 'Description',
            value: event.Description,
          },
          {
            name: 'location',
            type: 'text',
            placeholder: 'Location',
            value: event.Location,
          },
          {
            name: 'date',
            type: 'date',
            value: event.Date.split('T')[0],
          },
          {
            name: 'duration',
            type: 'number',
            placeholder: 'Duration in minutes',
            value: event.Duration,
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
              if (this.validateEventData(data)) {
                this.updateEvent(data);
                return true;
              } else {
                this.showValidationError();
                return false;
              }
            },
          },
        ],
      });

      await alert.present();
    });
  }

  validateEventData(data: any): boolean {
    return (
      data.title &&
      data.description &&
      data.location &&
      data.date &&
      data.duration
    );
  }

  showValidationError() {
    this.alertController
      .create({
        header: 'Invalid Input',
        message: 'All fields are required, and must be correctly formatted.',
        buttons: ['OK'],
      })
      .then((alert) => alert.present());
  }

  updateEvent(data: any) {
    this.dataService
      .editEvent(this.eventId!, {
        Title: data.title,
        Description: data.description,
        Location: data.location,
        Date: data.date,
        Duration: data.duration,
      })
      .subscribe({
        next: () => {
          console.log('Event updated successfully');
        },
        error: (error) => {
          console.error('Failed to update the event:', error);
        },
      });
  }
}
