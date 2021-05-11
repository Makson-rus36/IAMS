import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from '@nativescript/angular';

import { AppRoutingModule } from '@src/app/app-routing.module';
import { AppComponent } from '@src/app/app.component';
import { HomeComponent } from '@src/app/home/home.component';
import {EnterComponent} from '@src/app/enter/enter.component';
import {RegComponent} from '@src/app/registration/reg.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SettingsComponent} from '@src/app/settings/settings.component';
import { JwtModule } from "@auth0/angular-jwt";


// Uncomment and add to NgModule imports if you need to use two-way binding and/or HTTP wrapper
import { NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';
import {RecomendationComponent} from '@src/app/recomendation/recomendation.component';
import {ChatComponent} from '@src/app/chat/chat.component';
import {DatePipe} from '@angular/common';
import {ScheduleComponent} from '@src/app/medicineScheule/schedule.component';
import {AuthModule} from '@auth0/auth0-angular';
import {Auth0Component} from '@src/app/auth0/auth0.component';
import {HttpClientModule} from '@angular/common/http';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

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
    Auth0Component
  ],
  imports: [
      HttpClientModule,
    BrowserAnimationsModule,
    NativeScriptModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    AuthModule.forRoot({
      domain: 'dev-de7070c7.eu.auth0.com',
      clientId: 'rjN5zVLCKwZvaWL9aZYifEWwgLmgrN7Y'
    }),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
