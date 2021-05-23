import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';
import {AuthModel} from '@src/app/models/auth.model';

@Component({
    selector: 'app-acc',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit{
    constructor(private page: Page, private router: Router) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    onExit($event){
        const appSettings = require("tns-core-modules/application-settings");
        appSettings.setString("token", "");
        appSettings.setString("id_acc", "");
        appSettings.setString("id_user", "");
        this.router.navigate(['home'])
    }
}
