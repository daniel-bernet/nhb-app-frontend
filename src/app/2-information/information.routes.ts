import { Routes } from '@angular/router';
import { InformationPage } from './information.page';

export const routes: Routes = [
  {
    path: 'information',
    component: InformationPage,
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
    loadComponent: () =>
      import('./information.page').then((m) => m.InformationPage),
    pathMatch: 'full',
  },
];
