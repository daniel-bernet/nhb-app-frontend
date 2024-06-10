import { Component, OnInit } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { eyeOutline } from 'ionicons/icons';

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
  email: string = "";
  password: string = "";

  constructor() {
    addIcons({
      eyeOutline
    });
  }

  login() {
    if (this.email === "" || this.password === "") {
      console.log('insufficient input');
      return;
    }
    if (
      !this.email.match(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    ) {
      console.log(this.email + 'does not match regex');
      return;
    }
  }
}
