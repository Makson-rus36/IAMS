import { Component, OnInit } from '@angular/core';
import {AndroidApplication, Page} from '@nativescript/core';
import Theme from '@nativescript/theme';
import {Router} from '@angular/router';
import {ProfileService} from '@src/app/services/profile.service';
import {ModelUser} from '@src/app/models/modelUser';
import {AccModel} from '@src/app/models/acc.model';
import {ErrorModel} from '@src/app/models/error.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  user_data:ModelUser;
  constructor(private page: Page, private router:Router, private profileService: ProfileService) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.loadInfoUser()
  }
  loadInfoUser(){
    const appSettings = require("tns-core-modules/application-settings");
    this.profileService.getAccData().subscribe(
        (x)=>{
          let acc = <AccModel>x;
          appSettings.setString("acc_email", acc.emailAcc)
          appSettings.setString("acc_access", String(acc.accessTypeId))
          appSettings.setString("acc_img", String(acc.imageProfile))
          appSettings.setString("acc_login", acc.loginAcc)
          appSettings.setString("acc_phone", acc.phoneNumber)
          this.profileService.getUsersData().subscribe(x=>{
            this.user_data = <ModelUser>x;
          }, error => {
            console.log(error)
            this.router.navigate(["enter"])
          })
        }, (error:ErrorModel) => {
          this.router.navigate(["enter"])
        }
    );
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
  goToSchedule($event){
    this.router.navigate(['schedule']);
  }

}
