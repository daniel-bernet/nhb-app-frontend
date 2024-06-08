import { Routes } from '@angular/router';
import { CalendarPage } from './calendar.page';

export const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    loadComponent: () => import('./calendar.page').then((m) => m.CalendarPage),
    pathMatch: 'full',
  },
];
