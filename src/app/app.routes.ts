import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import {EnterComponent} from '@src/app/enter/enter.component';
import {RegComponent} from '@src/app/registration/reg.component';
import {SettingsComponent} from '@src/app/settings/settings.component';
import {RecomendationComponent} from '@src/app/recomendation/recomendation.component';
import {AboutComponent} from '@src/app/settings/about/about.component';
import {AccountComponent} from '@src/app/settings/account/account.component';
import {HelpComponent} from '@src/app/settings/help/help.component';
import {NotificationsComponent} from '@src/app/settings/notifications/notifications.component';
import {ProfileComponent} from '@src/app/settings/profile/profile.component';
import {ChatComponent} from '@src/app/chat/chat.component';
import {ScheduleComponent} from '@src/app/medicineScheule/schedule.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/signup',
      pathMatch: 'full',
  },
  {
      path: 'home',
      component: HomeComponent,
  },
    {
        path: 'enter',
        component: EnterComponent
    },
    {
        path: 'signup',
        component: RegComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'recommendation',
        component: RecomendationComponent
    },
    {
        path: 'about', component: AboutComponent
    },
    {
        path: 'account', component: AccountComponent
    },
    {
       path: 'help', component: HelpComponent
    },
    {
        path: 'notifications', component: NotificationsComponent
    },
    {
        path: 'profile', component: ProfileComponent
    },
    {
        path: 'chat', component: ChatComponent
    },
    {
        path:'schedule', component: ScheduleComponent
    }
];
