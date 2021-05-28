import {Component, OnInit} from '@angular/core';
import Theme from '@nativescript/theme';
import {AuthService} from '@src/app/services/auth.service';
import {ProfileService} from '@src/app/services/profile.service';
import {SheduleService} from '@src/app/services/shedule.service';
import {SearchUsersService} from '@src/app/services/search.users.service';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, ProfileService, SheduleService, SearchUsersService, DiagnosService]
})
export class AppComponent implements OnInit {
constructor(private router:Router) {
}
  ngOnInit() {
    try {
      Theme.setMode(Theme.Light);
      this.router.navigate(['check_enter'])

    } catch (e) {
      console.log('Error setting Theme to light mode', e);
    }
  }

}
