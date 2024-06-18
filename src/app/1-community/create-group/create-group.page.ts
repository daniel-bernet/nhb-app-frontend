import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonInput,
  IonLabel,
  IonList,
  IonItem,
  IonIcon,
  IonButton,
  AlertController,
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormatService } from 'src/app/services/format.service';
import { personCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonItem,
    IonList,
    IonLabel,
    IonInput,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class CreateGroupPage implements OnInit {
  errorMessage: any;
  groupName?: string;
  groupDescription?: string;
  groupMembers?: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    protected formatService: FormatService,
    private alertController: AlertController,
    private location : Location
  ) {
    addIcons({
      personCircleOutline,
      removeCircleOutline,
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation()?.extras.state?.['accounts']) {
        this.groupMembers =
          this.router.getCurrentNavigation()?.extras.state?.['accounts'];
      }
      if (this.router.getCurrentNavigation()?.extras.state?.['groupName']) {
        this.groupName =
          this.router.getCurrentNavigation()?.extras.state?.['groupName'];
      }
      if (this.router.getCurrentNavigation()?.extras.state?.['groupDescription']) {
        this.groupDescription =
          this.router.getCurrentNavigation()?.extras.state?.['groupDescription'];
      }
    });
  }

  async createGroup() {
    if (!this.groupName || !this.groupDescription) {
      this.errorMessage =
        'Please provide both a name and a description for the group.';
      return;
    }

    const accountIds = this.groupMembers!.map((member) => member.AccountID);

    this.dataService
      .createGroup(this.groupName, this.groupDescription, accountIds)
      .subscribe({
        next: (response) => {
          console.log('Group created successfully:', response);
          this.location.back();
        },
        error: (error) => {
          console.error('Failed to create the group:', error);
          this.errorMessage = 'Failed to create the group. Please try again.';
        },
      });
  }

  async addGroupMember() {
    const searchAlert = await this.alertController.create({
      header: 'Search for Group Members',
      inputs: [
        {
          name: 'searchText',
          type: 'text',
          placeholder: 'Enter name or email',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Search',
          handler: async (data) => {
            const searchText = data.searchText.trim();
            if (searchText) {
              this.dataService.searchAccounts(searchText).subscribe({
                next: (accounts) => this.showAccountsList(accounts),
                error: () => {
                  this.errorMessage = 'Failed to search accounts';
                },
              });
            }
          },
        },
      ],
    });

    await searchAlert.present();
  }

  async showAccountsList(accounts: any[]) {
    const selectAlert = await this.alertController.create({
      header: 'Select an Account',
      inputs: accounts.map((account) => ({
        name: 'accounts',
        type: 'radio',
        label: `${account.FirstName} ${account.LastName} - ${account.Email}`,
        value: account,
      })),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (selectedAccount) => {
            this.groupMembers = this.groupMembers
              ? [...this.groupMembers, selectedAccount]
              : [selectedAccount];
          },
        },
      ],
    });

    await selectAlert.present();
  }

  async removeGroupMember(member: any) {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to remove this member?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Remove',
          handler: () => {
            this.groupMembers = this.groupMembers!.filter(
              (m) => m.AccountID !== member.AccountID
            );
          },
        },
      ],
    });

    await alert.present();
  }
}
