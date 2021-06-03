import {Component, OnInit} from '@angular/core';
import {Page} from '@nativescript/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PillsModel} from '@src/app/models/pillsModel';
import {TreatmentCourseModel} from '@src/app/models/treatment.course.model';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {Subscription} from 'rxjs';
import {SheduleService} from '@src/app/services/shedule.service';

@Component({
    selector:'app-schedule',
    templateUrl:'./schedule.component.html',
    styleUrls:['./schedule.component.css']
})

export class ScheduleComponent implements OnInit{
    pills:TreatmentCourseModel[] = [];
    private scheduleSub: Subscription;
    private idD: number=-1;

    constructor(private page:Page, private router: Router, private activateRoute: ActivatedRoute, private scheduleService: SheduleService,
                private diagnosService: DiagnosService) {
        this.scheduleSub = activateRoute.queryParams.subscribe(
            (queryParam: any) => {
                this.idD = queryParam['idDiagnosis'];
            }
        );
    }

    ngOnInit() {
        this.page.actionBarHidden=true;
        this.scheduleService.getTreatmentCourses(this.idD).subscribe(x=>{
            this.pills = <TreatmentCourseModel[]>x['content'];
            for (let pill of this.pills) {
                this.diagnosService.getPill(pill.medicamentsId).subscribe((x:PillsModel)=>{
                    pill.medicaments = x;
                }, error => {
                    console.log(error)
                })
            }
        }, error => {
            console.log(error)
        })
    }

    goToInfoPill(id:number){
        this.router.navigate(['info', id]);
    }

    goToHome($event){
        this.router.navigate(['home']);
    }
}
