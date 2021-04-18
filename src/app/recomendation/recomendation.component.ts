import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-recommendation',
    templateUrl: './recomendation.component.html',
    styleUrls: ['./recomendation.component.css']
})

export class RecomendationComponent implements OnInit {
    constructor(private page:Page, private router: Router) {
    }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    goToHome($event){
        this.router.navigate(['home']);
    }
}
