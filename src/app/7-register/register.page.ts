import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

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
    ExploreContainerComponent,
  ],
})
export class RegisterPage {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  passwordConfirm: string = '';

  constructor() {}

  register() {
    if (
      this.firstName === '' ||
      this.lastName === '' ||
      this.email === '' ||
      this.password === '' ||
      this.passwordConfirm === ''
    ) {
      console.log('insufficient input');
      return;
    }
    if (
      !this.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    ) {
      console.log(this.email + 'does not match regex');
      return;
    }
    if (this.password !== this.passwordConfirm) {
      console.log('passwords dont match');
    }
    if (!this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$/)) {
    }
  }
}
