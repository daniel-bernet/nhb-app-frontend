import { Routes } from '@angular/router';
import { SettingsPage } from './settings.page';

export const routes: Routes = [
  {
    path: 'settings',
    component: SettingsPage,
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
    loadComponent: () => import('./settings.page').then((m) => m.SettingsPage),
    pathMatch: 'full',
  },
];
