import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonItemDivider,
  IonItemGroup,
  IonItem,
  IonList,
  IonIcon,
  IonTabButton,
  IonButton,
  IonButtons,
  IonActionSheet,
  IonFab,
  IonFabButton,
  IonFabList,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, peopleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-community',
  templateUrl: 'community.page.html',
  styleUrls: ['community.page.scss'],
  standalone: true,
  imports: [
    IonFabList,
    IonFabButton,
    IonFab,
    IonActionSheet,
    IonButtons,
    IonButton,
    IonTabButton,
    IonIcon,
    IonList,
    IonItem,
    IonItemGroup,
    IonItemDivider,
    IonLabel,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class CommunityPage {
  createGroup() {
    console.log('createGroup');
  }
  constructor() {
    addIcons({
      add,
      peopleOutline,
    });
  }
}
