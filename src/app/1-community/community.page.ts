import { Component } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
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
  groups: Map<string, string> = new Map([
    ['1', 'group1'],
    ['2', 'group2'],
    ['3', 'group3'],
  ]);

  openGroup(groupID: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        groupID: groupID,
      },
    };
    this.router.navigate(['tabs','community','group'], navigationExtras);
  }

  createGroup() {
    console.log('createGroup');
  }

  constructor(private router: Router) {
    addIcons({
      add,
      peopleOutline,
    });
  }
}
