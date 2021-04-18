import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';

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
}
