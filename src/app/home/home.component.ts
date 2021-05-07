import { Component, OnInit } from '@angular/core';
import {AndroidApplication, Page} from '@nativescript/core';
import Theme from '@nativescript/theme';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private page: Page, private router:Router) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
  }

  goToSettings($event){
    this.router.navigate(['settings']);
  }

  goToRecommendation($event){
    this.router.navigate(['recommendation']);
  }

  goToChat($event){
    this.router.navigate(['chat']);
  }

}
