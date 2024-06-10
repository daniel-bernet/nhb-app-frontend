import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonLabel,
  IonInput,
  IonButton,
  IonItem,
  IonCard,
  IonNavLink,
  IonIcon,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline } from 'ionicons/icons';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonNavLink,
    IonCard,
    IonItem,
    IonButton,
    IonInput,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    CommonModule,
    FormsModule,
  ],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage?: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    addIcons({
      eyeOutline,
    });
  }

  async login(): Promise<void> {
    if (this.email === '' || this.password === '') {
      this.displayError('Please fill all fields');
      return;
    }

    if (
      !this.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    ) {
      this.displayError('Please enter a valid email address');
      return;
    }

    this.authService?.login(this.email, this.password).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/community');
      },
      error: (error) => {
        this.displayError(
          error.error?.message || 'Login failed, please try again'
        );
      },
    });
  }

  displayError(message: string): void {
    this.errorMessage = message;

    this.alertController
      ?.create({
        header: 'Authentication Failed',
        message: message,
        buttons: ['OK'],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
