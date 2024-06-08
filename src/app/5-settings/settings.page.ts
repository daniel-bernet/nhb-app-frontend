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
  IonLabel, IonItemGroup, IonItemDivider } from '@ionic/angular/standalone';
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

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonItemDivider, IonItemGroup, 
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
  constructor() {
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
}
