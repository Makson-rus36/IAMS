import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';
import {PillsModel} from '@src/app/models/pillsModel';
import {TreatmentCourseModel} from '@src/app/models/treatment.course.model';

@Component({
    selector:'app-schedule',
    templateUrl:'./schedule.component.html',
    styleUrls:['./schedule.component.css']
})

export class ScheduleComponent implements OnInit{
    pills:TreatmentCourseModel[] = [];

    constructor(private page:Page, private router: Router) {
    }

    ngOnInit() {
        this.page.actionBarHidden=true;
    }

    goToInfoPill(id:number){
        this.router.navigate(['info', id]);
    }

    goToHome($event){
        this.router.navigate(['home']);
    }
}
