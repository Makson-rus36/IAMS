import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css']
})

export class HelpComponent implements OnInit{
    constructor(private page: Page, private router: Router) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }
}
