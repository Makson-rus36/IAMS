import { Component, OnInit } from '@angular/core';
import {AndroidApplication, Page} from '@nativescript/core';
import Theme from '@nativescript/theme';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private page: Page) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }
}
