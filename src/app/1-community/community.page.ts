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
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, peopleOutline } from 'ionicons/icons';
import { DataService } from '../services/data.service';

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
  ],
})
export class CommunityPage implements OnInit {
  constructor(
    private router: Router,
    private dataService: DataService,
    private alertController: AlertController
  ) {
    addIcons({
      add,
      peopleOutline,
    });
  }

  groups: any[] = [];

  ngOnInit() {
    this.fetchGroups();
  }

  fetchGroups() {
    this.dataService.getGroups().subscribe({
      next: (groups) => {
        console.log(groups);
        this.groups = groups;
      },
      error: (error) => {
        console.error('Failed to fetch groups', error);
      },
    });
  }

  openGroup(group: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        group: group,
      },
    };
    this.router.navigate(['tabs', 'community', 'group'], navigationExtras);
  }

  createGroup() {
    this.router.navigate(['tabs', 'community', 'create-group'])
  }

  /*
  async createGroup() {
    const alert = await this.alertController.create({
      header: 'Create New Group',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Group Name',
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Description',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Create',
          handler: (data) => {
            if (data.name && data.description) {
              this.dataService
                .createGroup(data.name, data.description)
                .subscribe({
                  next: () => {
                    console.log('Group created successfully');
                  },
                  error: (error) => {
                    console.error('Failed to create group', error);
                    return false;
                  },
                });
              return true;
            } else {
              return false;
            }
          },
        },
      ],
    });

    await alert.present();
  }
*/

}
