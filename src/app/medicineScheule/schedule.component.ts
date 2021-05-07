import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {Router} from '@angular/router';
import {PillsModel} from '@src/app/models/pillsModel';

@Component({
    selector:'app-schedule',
    templateUrl:'./schedule.component.html',
    styleUrls:['./schedule.component.css']
})

export class ScheduleComponent implements OnInit{
    pills:PillsModel[] = [];

    constructor(private page:Page, private router: Router) {
    }

    ngOnInit() {
        let p = new PillsModel();
        p.schedule='Среда 18:00';
        p.name='Анальгин';
        p.id=1;
        let p1 = new PillsModel();
        p1.schedule='Среда 10:00';
        p1.name='Валидол';
        p1.id=1;
        this.pills.push(p1,p);
        this.page.actionBarHidden=true;
    }

    goToInfoPill(id:number){
        this.router.navigate(['info', id]);
    }

    goToHome($event){
        this.router.navigate(['home']);
    }
}
