import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-help',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.css']
})

export class NotificationsComponent implements OnInit{
    constructor(private page: Page, private router: Router) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }
}
