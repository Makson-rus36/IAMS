import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit{
    constructor(private page: Page, private router: Router) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }
}
