import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.css']
})

export class RegComponent implements OnInit {
    nameUser = '';
    lastNameUser = '';
    otchUser = '';
    phoneNumberUser = '';
    emailUser = '';
    passwordUser = '';

    constructor(private page: Page, private router: Router) {
    }
    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    backAuth($event) {
        this.router.navigate(['enter']);
    }

    createAcc($event) {
        this.router.navigate(['home']);
    }
}
