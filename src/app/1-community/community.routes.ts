import { Routes } from '@angular/router';
import { CommunityPage } from './community.page';
import { GroupPage } from './group/group.page';
import { CreateEventPage } from './create-event/create-event.page';
import { CreatePollPage } from './create-poll/create-poll.page';
import { EventPage } from './event/event.page';
import { PollPage } from './poll/poll.page';
import { QuestionPage } from './question/question.page';
import { CreateGroupPage } from './create-group/create-group.page';

export const routes: Routes = [
  {
    path: '',
    component: CommunityPage,
  },
  {
    path: 'group',
    component: GroupPage,
  },
  {
    path: 'create-group',
    component: CreateGroupPage,
  },
  {
    path: 'group/create-event',
    component: CreateEventPage,
  },
  {
    path: 'group/create-poll',
    component: CreatePollPage,
  },
  {
    path: 'group/event',
    component: EventPage,
  },
  {
    path: 'group/poll',
    component: PollPage,
  },
  {
    path: 'group/poll/question',
    component: QuestionPage,
  },
];
