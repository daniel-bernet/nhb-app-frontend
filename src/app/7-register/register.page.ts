import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLabel,
  AlertController,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonButton,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class RegisterPage {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) {}

  register(): void {
    if (
      this.firstName === '' ||
      this.lastName === '' ||
      this.email === '' ||
      this.password === '' ||
      this.passwordConfirm === ''
    ) {
      this.displayError('All fields are required.');
      return;
    }
    if (
      !this.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    ) {
      this.displayError('Please enter a valid email address.');
      return;
    }
    if (this.password !== this.passwordConfirm) {
      this.displayError('Passwords do not match.');
      return;
    }
    if (
      !this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    ) {
      this.displayError(
        'Password must include at least 8 characters, one uppercase, one lowercase, and one number.'
      );
      return;
    }

    this.authService
      .register(this.firstName, this.lastName, this.email, this.password)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/tabs/community');
        },
        error: (error) => {
          this.displayError(
            error.error?.message || 'Registration failed, please try again'
          );
        },
      });
  }

  displayError(message: string): void {
    this.errorMessage = message;

    this.alertController
      .create({
        header: 'Registration Error',
        message: message,
        buttons: ['OK'],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
