import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Page} from '@nativescript/core';
import {ErrorModel} from '@src/app/models/error.model';
import {ModelUser} from '@src/app/models/modelUser';
import {ProfileService} from '@src/app/services/profile.service';

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})

export class ProfileComponent implements OnInit{
    isEdit:boolean = false;
    usersData: ModelUser;
    constructor(private router: Router, private page:Page, private profileService: ProfileService) {
    }

    ngOnInit() {
        this.usersData = new ModelUser();
        this.usersData.lastname = "";
        this.usersData.firstname = "";
        this.usersData.otchestvo = "";
        this.usersData.datebirth = "";
        this.profileService.getUsersData().subscribe((x:ModelUser)=>{
            this.usersData = x;
        }, (error:ErrorModel) => {
            this.router.navigate(['enter'])
        })
        this.page.actionBarHidden = true;
    }

    goToSettings($event){
        this.router.navigate(['settings']);
    }

    goHelp($event){

    }

}
