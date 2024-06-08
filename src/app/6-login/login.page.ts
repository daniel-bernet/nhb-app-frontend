import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonLabel,
  IonInput,
  IonButton, IonItem, IonCard, IonNavLink } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { RegisterPage } from '../7-register/register.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonNavLink, IonCard, IonItem, 
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
  registerPage = RegisterPage;  

  constructor(private router: Router) {}
}
