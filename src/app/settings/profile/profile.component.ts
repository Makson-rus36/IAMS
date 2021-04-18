import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Page} from '@nativescript/core';

@Component({
    selector: "app-profile",
    templateUrl: "./profile.component.html",
    styleUrls: ["./profile.component.css"]
})

export class ProfileComponent implements OnInit{

    constructor(private router: Router, private page:Page) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    goToHome($event){
        this.router.navigate(['home']);
    }
}
