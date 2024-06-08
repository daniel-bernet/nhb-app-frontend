import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  IonApp,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonTabs,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  peopleOutline,
  informationCircleOutline,
  calendarOutline,
  bookOutline,
  cogOutline,
} from 'ionicons/icons';
import { filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    IonTabs,
    IonLabel,
    IonIcon,
    IonTabButton,
    IonTabBar,
    IonApp,
    IonRouterOutlet,
    AsyncPipe,
  ],
})
export class AppComponent {
  showTabs$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(
      (event: NavigationEnd) =>
        event.urlAfterRedirects === '/community' ||
        event.urlAfterRedirects === '/information' ||
        event.urlAfterRedirects === '/calendar' ||
        event.urlAfterRedirects === '/media' ||
        event.urlAfterRedirects === '/settings'
    )
  );
  constructor(private router: Router) {
    addIcons({
      peopleOutline,
      informationCircleOutline,
      calendarOutline,
      bookOutline,
      cogOutline,
    });
  }
}
