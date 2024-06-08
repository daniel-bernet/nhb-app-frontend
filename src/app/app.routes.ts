import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'community',
    loadChildren: () =>
      import('./1-community/community.routes').then((m) => m.routes),
  },
  {
    path: 'information',
    loadChildren: () =>
      import('./2-information/information.routes').then((m) => m.routes),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./3-calendar/calendar.routes').then((m) => m.routes),
  },
  {
    path: 'media',
    loadChildren: () => import('./4-media/media.routes').then((m) => m.routes),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./5-settings/settings.routes').then((m) => m.routes),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./6-login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./7-register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
