import { Component, OnInit } from '@angular/core';
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
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonLoading,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, peopleOutline } from 'ionicons/icons';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-community',
  templateUrl: 'community.page.html',
  styleUrls: ['community.page.scss'],
  standalone: true,
  imports: [
    IonLoading,
    IonText,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
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
    AsyncPipe,
  ],
})
export class CommunityPage implements OnInit {
  groups$?: Observable<any[]>;

  constructor(private router: Router, private dataService: DataService) {
    addIcons({
      add,
      peopleOutline,
    });
  }

  async ngOnInit() {
    this.groups$ = await this.dataService.getGroups();
  }

  openGroup(group: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        groupId: group.GroupID,
      },
    };
    this.router.navigate(['tabs', 'community', 'group'], navigationExtras);
  }

  createGroup() {
    this.router.navigate(['tabs', 'community', 'create-group']);
  }
}
