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

    goToHome($event){
        this.router.navigate(['home']);
    }
}
