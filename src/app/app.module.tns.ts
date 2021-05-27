import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import {EnterComponent} from '@src/app/enter/enter.component';
import {RegComponent} from '@src/app/registration/reg.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsComponent} from '@src/app/settings/settings.component';


// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';
import {RecomendationComponent} from '@src/app/recomendation/recomendation.component';
import {ChatComponent} from '@src/app/chat/chat.component';
import {DatePipe} from '@angular/common';
import {ScheduleComponent} from '@src/app/medicineScheule/schedule.component';
import {HttpClientModule} from '@angular/common/http';
import {DropDownModule} from 'nativescript-drop-down/angular';
import {NativeScriptDateTimePickerModule} from '@nativescript/datetimepicker/angular';
import {AccountComponent} from '@src/app/settings/account/account.component';
import {ProfileComponent} from '@src/app/settings/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
      EnterComponent,
      RegComponent,
      SettingsComponent,
      RecomendationComponent,
      ChatComponent,
      ScheduleComponent,
      AccountComponent,
      ProfileComponent
  ],
  imports: [
    NativeScriptDateTimePickerModule,
    DropDownModule,
      HttpClientModule,
    BrowserAnimationsModule,
    NativeScriptModule,
    AppRoutingModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
