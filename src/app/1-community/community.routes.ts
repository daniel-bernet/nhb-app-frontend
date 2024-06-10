import { Routes } from '@angular/router';
import { CommunityPage } from './community.page';

export const routes: Routes = [
  {
    path: 'community',
    component: CommunityPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/community',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./community.page').then((m) => m.CommunityPage),
    pathMatch: 'full',
  },
];
