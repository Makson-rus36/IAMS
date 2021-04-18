import { Routes } from '@angular/router';

import { HomeComponent } from '@src/app/home/home.component';
import {EnterComponent} from '@src/app/enter/enter.component';
import {RegComponent} from '@src/app/registration/reg.component';
import {SettingsComponent} from '@src/app/settings/settings.component';
//import {SettingsComponent} from '@src/app/settings/settings.component';

export const routes: Routes = [
  {
      path: '',
      redirectTo: '/home',
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
];
