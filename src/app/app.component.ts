import {Component, OnInit} from '@angular/core';
import Theme from '@nativescript/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
