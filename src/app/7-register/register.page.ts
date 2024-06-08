import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar, IonInput, IonButton, IonLabel } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from "../explore-container/explore-container.component";

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    standalone: true,
    imports: [IonLabel, IonButton, IonInput, 
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        ExploreContainerComponent
    ]
})
export class RegisterPage {
  constructor() {}
}