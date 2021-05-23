import {Component, OnInit} from '@angular/core';
import Theme from '@nativescript/theme';
import {AuthService} from '@src/app/services/auth.service';
import {ProfileService} from '@src/app/services/profile.service';
import {SheduleService} from '@src/app/services/shedule.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, ProfileService, SheduleService]
})
export class AppComponent implements OnInit {

  ngOnInit() {
    try {
      Theme.setMode(Theme.Light);
    } catch (e) {
      console.log('Error setting Theme to light mode', e);
    }
  }

}
