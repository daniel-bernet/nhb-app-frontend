import { Routes } from '@angular/router';
import { MediaPage } from './media.page';

export const routes: Routes = [
  {
    path: 'media',
    component: MediaPage,
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
    loadComponent: () => import('./media.page').then((m) => m.MediaPage),
    pathMatch: 'full',
  },
];
