import {Component, OnInit} from '@angular/core';
import {AndroidActivityBackPressedEventData, AndroidApplication, Page} from '@nativescript/core';
import * as application from "tns-core-modules/application";
import {Router} from '@angular/router';
import {ProfileService} from '@src/app/services/profile.service';
import {ModelUser} from '@src/app/models/modelUser';
import {ModelHistoryChange} from '@src/app/models/modelHistoryChange';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
    historyChange: ModelHistoryChange[] = [];
    user_data: ModelUser;
    typeAccess:string = "";

    constructor(private page: Page, private router: Router, private profileService: ProfileService) {

    }

    ngOnInit() {
        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                if (this.router.isActive("/home", false)) {
                    let options = {
                        title: "Выйти",
                        message: "Вы действительно хотите выйти из приложения?",
                        okButtonText: "Да",
                        cancelButtonText: "Нет"
                    };
                    data.cancel = true;
                    // @ts-ignore
                    confirm(options).then((result: boolean) => {
                        if(result==true)
                            application.android.foregroundActivity.finish();
                    });
                }
            });
        }
        this.page.actionBarHidden = true;
        const appSettings = require("tns-core-modules/application-settings");
        this.typeAccess = appSettings.getString("acc_access");
        if(this.typeAccess=='PATIENT')
            this.loadInfoUser();
    }

    loadInfoUser() {
        this.profileService.getInfoHealth().subscribe(x => {
            let arr = (<ModelHistoryChange[]>x['content']).sort(function (first, second) {
                if (new Date(first.dateChange) > new Date(second.dateChange)) {
                    return -1;
                } else if (new Date(first.dateChange) < new Date(second.dateChange)) {
                    return 1;
                } else {
                    return 0;
                }
            });
            this.historyChange.push(arr[0], arr[1], arr[2]);
            this.historyChange = this.historyChange.sort(function (a, b) {
                return a.typeChange.id - b.typeChange.id;
            });
        }, error => {
            console.log(error);
        });
    }

    goToSettings($event) {
        this.router.navigate(['settings']);
    }

    goToRecommendation($event) {
        this.router.navigate(['recommendation']);
    }

    goToChat($event) {
        this.router.navigate(['chat']);
    }

    goToSchedule($event) {
        this.router.navigate(['schedule']);
    }

    goUpdate($event) {
        this.router.navigate(['upd_state']);
    }

    goToSearch($event){
        this.router.navigate(['search']);
    }


}
