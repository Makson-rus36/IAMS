import {Component, OnInit} from '@angular/core';
import {AndroidActivityBackPressedEventData, AndroidApplication, Page} from '@nativescript/core';
import {Router} from '@angular/router';
import * as application from 'tns-core-modules/application';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit{
    constructor(private page: Page, private router: Router) {
    }

    ngOnInit() {
        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                if (this.router.isActive("/about", false)) {
                    data.cancel = true;
                    this.router.navigate(['/home'])
                }
            });
        }
        this.page.actionBarHidden = true;
    }
}
