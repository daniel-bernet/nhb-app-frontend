import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonItemGroup,
  IonItemDivider,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  keyOutline,
  mailOpenOutline,
  personOutline,
  logOutOutline,
  trashOutline,
  languageOutline,
  contrastOutline,
} from 'ionicons/icons';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonItemDivider,
    IonItemGroup,
    IonLabel,
    IonIcon,
    IonItem,
    IonList,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class SettingsPage {
  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router
  ) {
    addIcons({
      keyOutline,
      mailOpenOutline,
      personOutline,
      logOutOutline,
      trashOutline,
      languageOutline,
      contrastOutline,
    });
  }

  async changeName() {
    const alert = await this.alertController.create({
      header: 'Change Name',
      inputs: [
        {
          name: 'firstName',
          type: 'text',
          placeholder: 'New First Name',
        },
        {
          name: 'lastName',
          type: 'text',
          placeholder: 'New Last Name',
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
            this.apiService.changeFirstName(data.firstName).subscribe();
            this.apiService.changeLastName(data.lastName).subscribe();
          },
        },
      ],
    });
    await alert.present();
  }

  async changeEmail() {
    const alert = await this.alertController.create({
      header: 'Change Email',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'New Email',
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
            this.apiService.changeEmail(data.email).subscribe();
          },
        },
      ],
    });
    await alert.present();
  }

  async changePassword() {
    const alert = await this.alertController.create({
      header: 'Change Password',
      inputs: [
        {
          name: 'oldPassword',
          type: 'password',
          placeholder: 'Old Password',
        },
        {
          name: 'newPassword',
          type: 'password',
          placeholder: 'New Password',
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
            this.apiService
              .changePassword(data.oldPassword, data.newPassword)
              .subscribe();
          },
        },
      ],
    });
    await alert.present();
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Delete Account',
      message:
        'Are you sure you want to delete your account? All relevant data and information tied to the user will be deleted.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.apiService.deleteAccount().subscribe({
              next: () => {
                this.router.navigateByUrl('/login');
              },
              error: (err) => {
                console.error('Failed to delete account:', err);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async logOut() {
    const alert = await this.alertController.create({
      header: 'Log Out',
      message: 'Are you sure you want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Log Out',
          role: 'destructive',
          handler: () => {
            this.apiService.logOut().subscribe({
              next: () => {
                this.router.navigateByUrl('/login');
              },
              error: (err) => {
                console.error('Failed to delete account:', err);
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
