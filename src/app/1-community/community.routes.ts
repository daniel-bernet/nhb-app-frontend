import { Routes } from '@angular/router';
import { CommunityPage } from './community.page';
import { GroupPage } from './group/group.page';

export const routes: Routes = [
  {
    path: '',
    component: CommunityPage,
  },
  {
    path: 'group',
    component: GroupPage
  },
];
