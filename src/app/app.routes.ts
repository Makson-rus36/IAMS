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
import {UpdateComponent} from '@src/app/update/update.component';
import {Enter_sysComponent} from '@src/app/enter_sys/enter_sys.component';
import {SearchComponent} from '@src/app/search/search.component';
import {ProfileUserComponent} from '@src/app/profile/profile.component';
import {DiagnosisAddComponent} from '@src/app/diagnosis/diagnosis.add.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/check_enter',
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
    },
    {
        path:'upd_state', component: UpdateComponent
    },
    {
        path:'check_enter', component: Enter_sysComponent
    },
    {
        path:'search', component:SearchComponent
    },
    {
        path:'profile_user/:id', component: ProfileUserComponent
    },
    {
        path:'diagnosis_add', component: DiagnosisAddComponent
    }
];
