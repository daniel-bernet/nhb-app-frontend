import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from "../explore-container/explore-container.component";

@Component({
    selector: 'app-media',
    templateUrl: './media.page.html',
    styleUrls: ['./media.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        ExploreContainerComponent
    ]
})
export class MediaPage {
  constructor() {}
}
