import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';
import {ProfileService} from '@src/app/services/profile.service';
import {AccModel} from '@src/app/models/acc.model';
import {ModelUser} from '@src/app/models/modelUser';
import {ModelHistoryChange} from '@src/app/models/modelHistoryChange';
import {ErrorModel} from '@src/app/models/error.model';

@Component({
    selector: 'app-enter_sys',
    templateUrl: './enter_sys.component.html',
    styleUrls:['./enter_sys.component.css']
})

export class Enter_sysComponent implements OnInit{

    constructor(private page:Page, private router:Router, private profileService: ProfileService) {

    }

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
                appSettings.setString("acc_access", String(acc.accessType))
                appSettings.setString("acc_img", String(acc.imageProfile))
                appSettings.setString("acc_login", acc.loginAcc)
                appSettings.setString("acc_phone", acc.phoneNumber)
                this.router.navigate(['home']);
            }, (error:ErrorModel) => {
                this.router.navigate(["enter"]);
            }
        );
    }
}
