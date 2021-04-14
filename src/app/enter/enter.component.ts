import { Component, OnInit } from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-enter',
    templateUrl: './enter.component.html',
    styleUrls: ['./enter.component.css'],
})
export class EnterComponent implements OnInit {
    user: string;
    isLoggingIn = true;
    constructor(private page: Page, private router: Router) { }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }
    toggleDisplay($event) {
        this.router.navigate(['signup']);
    }

    submit() {

    }
}
