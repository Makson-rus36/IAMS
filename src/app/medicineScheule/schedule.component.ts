import {Component, OnInit} from '@angular/core';
import {AndroidActivityBackPressedEventData, AndroidApplication, Page} from '@nativescript/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PillsModel} from '@src/app/models/pillsModel';
import {TreatmentCourseModel} from '@src/app/models/treatment.course.model';
import {DiagnosService} from '@src/app/services/diagnos.service';
import {Subscription} from 'rxjs';
import {SheduleService} from '@src/app/services/shedule.service';
import * as application from 'tns-core-modules/application';

@Component({
    selector:'app-schedule',
    templateUrl:'./schedule.component.html',
    styleUrls:['./schedule.component.css']
})

export class ScheduleComponent implements OnInit{
    pills:TreatmentCourseModel[] = [];
    showInfo=false;
    pillInfo:PillsModel;
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
        if (application.android) {
            application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
                if (this.router.isActive("/schedule", false)) {
                    data.cancel = true;
                    this.router.navigate(['/home'])
                }
            });
        }
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

    goToInfoPill(pill:PillsModel){
        this.showInfo=true;
        this.pillInfo=pill;
    }

    goToHome($event){
        this.router.navigate(['/home']);
    }

    goToBack($event){
        this.showInfo=false;
    }
}
