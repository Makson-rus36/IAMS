import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';

@Component({
    selector: 'app-reg',
    templateUrl: './reg.component.html',
    styleUrls: ['./reg.component.css']
})

export class RegComponent implements OnInit {
    constructor(private page: Page) {
    }
    ngOnInit() {
        this.page.actionBarHidden = true;
    }
}
