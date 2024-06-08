import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { addIcons } from 'ionicons';
import { menuOutline } from 'ionicons/icons';

@Component({
  selector: 'app-information',
  templateUrl: 'information.page.html',
  styleUrls: ['information.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,

    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ExploreContainerComponent,
  ],
})
export class InformationPage {
  informationActionSheet() {
    console.log('clicked');
  }
  constructor() {
    addIcons({
      menuOutline,
    });
  }
}
