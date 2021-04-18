import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Page} from '@nativescript/core';

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"]
})

export class SettingsComponent implements OnInit{

    constructor(private router: Router, private page:Page) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    goToAbout($event){
        this.router.navigate(['about'])
    }
    goToAccount($event){
        this.router.navigate(['account'])
    }
    goToHelp($event){
        this.router.navigate(['help'])
    }
    goToNotifications($event){
        this.router.navigate(['notifications'])
    }
    goToProfile($event){
        this.router.navigate(['profile'])
    }

    goToHome($event){
        this.router.navigate(['home']);
    }
}
